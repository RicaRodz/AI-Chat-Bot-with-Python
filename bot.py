import openai

with open('hidden.txt') as f:
    openai.api_key = f.read()

def get_api_response(prompt: str) -> str | None:
    text: str | None = None


    try: 
        response: dict = openai.Completion.create(
            model = 'text-davinci-003', 
            prompt = prompt,
            temperature=0.9,
            max_tokens=150,
            top_p = 1,
            frequency_penalty =0.6,
            stop = [' Human:', ' AI:']
        )
        choices: dict = response.get('choices')[0]
        text = choices.get('text')
    except Exception as e:
        print('Error:', e)
    
    return text

def update_list(message: str, pl: list[str]):
    pl.append(message)


def create_prompt(message: str, pl: list[str]) -> str:
    p_message: str = f'\nHuman: {message}'
    update_list(p_message,pl)
    prompt: str = ''.join(pl)
    return prompt

def get_bot_response(message: str, pl: list[str]) -> str:
    prompt: str = create_prompt(message, pl)
    bot_response: str = get_api_response(prompt)

    if bot_response:
        update_list(bot_response,pl)
        pos: int = bot_response.find('\nAI: ')
        bot_response = bot_response[pos + 5:] 
    else:
        bot_response = "Something Died"

    return bot_response

def main():
    prompt_list: list[str] = ["You give Union College information",
                              '\nHuman: What class should I take for cst',
                              '\nAI: cst-161, cst-162, datastructers']
    
    while True:
        user_input: str = input('You: ')
        response: str = get_bot_response(user_input,prompt_list)
        print(f'Bot: {response}')


prompt = "This is ai bot eeeeeeeeeeeeeeeeeee"
print(get_api_response(prompt))
main()