import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const ASSISTANT_ID = 'asst_P4mHBxXIQwbZik526dS7gire';

export async function getOpenAIResponse(threadId, userMessage, onToolCall) {
    try {
        // 1. Create a Thread if not provided (or use existing)
        let currentThreadId = threadId;
        if (!currentThreadId) {
            const thread = await openai.beta.threads.create();
            currentThreadId = thread.id;
        }

        // 2. Add Message
        await openai.beta.threads.messages.create(currentThreadId, {
            role: 'user',
            content: userMessage,
        });

        // 3. Run
        let run = await openai.beta.threads.runs.createAndPoll(currentThreadId, {
            assistant_id: ASSISTANT_ID,
        });

        // 4. Handle Tools or Completion
        if (run.status === 'requires_action') {
            const toolOutputs = [];

            for (const toolCall of run.required_action.submit_tool_outputs.tool_calls) {
                if (toolCall.function.name === 'record_lead') {
                    // Execute the tool logic (write to sheet)
                    const args = JSON.parse(toolCall.function.arguments);

                    // Call the callback provided by the caller
                    const result = await onToolCall(toolCall.function.name, args);

                    toolOutputs.push({
                        tool_call_id: toolCall.id,
                        output: JSON.stringify({ success: true, result: "Lead recorded in database." })
                    });
                }
            }

            // Submit tool outputs back to OpenAI
            if (toolOutputs.length > 0) {
                run = await openai.beta.threads.runs.submitToolOutputsAndPoll(
                    currentThreadId,
                    run.id, // Only use Run ID and Thread ID here
                    { tool_outputs: toolOutputs }
                );
            }
        }

        // 5. Get Final Response
        if (run.status === 'completed') {
            const messages = await openai.beta.threads.messages.list(run.thread_id);
            const lastMessage = messages.data[0];
            const responseText = lastMessage.content[0].text.value;
            return { text: responseText, threadId: currentThreadId };
        } else {
            return { text: "System is processing complex logic... (Status: " + run.status + ")", threadId: currentThreadId };
        }

    } catch (error) {
        console.error('OpenAI Error:', error);
        return { text: "Сбой нейросети. Переключаю на инженера.", threadId: threadId };
    }
}
