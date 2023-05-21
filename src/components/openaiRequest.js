

const fetchResponse = async (url, token, query) => {

    const requestBody = {
        model: "text-davinci-003",
        prompt: `${query}, in JavaScript`,
        temperature: 1,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        max_tokens: 256,
    }

    const response = await fetch(url,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
    });
    return response.json();
};

export default fetchResponse;