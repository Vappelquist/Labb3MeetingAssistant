export async function getStaff(){
    const res = await fetch('/api/staff');
    return res.json();
}

export async function getRooms(){
    const res = await fetch('/api/staff/rooms');
    return res.json();
}

async function post(endpoint, body) {
    const response = await fetch(`/api/ai/${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'An error occurred');
    }
    const data = await response.json();
    return data.result;
}
export const summarize = (data) => post('summarize', data);
export const createAgenda = (data) => post('agenda', data);
export const createInvitation = (data) => post('invitation', data);