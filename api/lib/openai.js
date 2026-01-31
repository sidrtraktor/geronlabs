import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const ASSISTANT_ID = 'asst_P4mHBxXIQwbZik526dS7gire';

export async function getOpenAIResponse(threadId, userMessage, onToolCall) {
    try {
        // 1. Create a Thread
        // Note: For MVP stateless, we create a new thread for each message.
        const thread = await openai.beta.threads.create();
        const currentThreadId = thread.id;

        // 2. Add Message
        await openai.beta.threads.messages.create(currentThreadId, {
            role: 'user',
            content: userMessage,
        });

        // 3. Run with specific model overrides
        // User requested: gpt-4-turbo, temp 1.0, top_p 1.0
        let run = await openai.beta.threads.runs.createAndPoll(currentThreadId, {
            assistant_id: ASSISTANT_ID,
            model: 'gpt-4-turbo',
            temperature: 1.0,
            top_p: 1.0
        });

        // 4. Handle Tools
        if (run.status === 'requires_action') {
            const toolOutputs = [];

            for (const toolCall of run.required_action.submit_tool_outputs.tool_calls) {
                if (toolCall.function.name === 'record_lead') {
                    const args = JSON.parse(toolCall.function.arguments);
                    await onToolCall(toolCall.function.name, args);

                    toolOutputs.push({
                        tool_call_id: toolCall.id,
                        output: JSON.stringify({ success: true, result: "Lead recorded." })
                    });
                }
            }

            if (toolOutputs.length > 0) {
                run = await openai.beta.threads.runs.submitToolOutputsAndPoll(
                    currentThreadId,
                    run.id,
                    { tool_outputs: toolOutputs }
                );
            }
        }

        // 5. Get Response
        if (run.status === 'completed') {
            const messages = await openai.beta.threads.messages.list(run.thread_id);
            const lastMessage = messages.data[0];
            const responseText = lastMessage.content[0].text.value;
            return { text: responseText, threadId: currentThreadId };
        } else {
            return { text: "...", threadId: currentThreadId };
        }

    } catch (error) {
        console.error('OpenAI Error:', error);
        return { text: "Ошибка связи с нейроцентром.", threadId: threadId };
    }
}
