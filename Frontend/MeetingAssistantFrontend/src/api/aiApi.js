export async function getStaff(){
    const res = await fetch('/api/staff');
    return res.json();
}

export async function getRooms(){
    const res = await fetch('/api/staff/rooms');
    return res.json();
}