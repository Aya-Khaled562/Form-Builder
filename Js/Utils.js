export async function getJson(path) {
    const response = await fetch(path);
    return await response.json();
}

export function download(jsonData, type_of = "text/plain", filename = "data.txt") {
    let body = document.body;
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify(jsonData, null, 2)], {
        type: type_of
    }));
    a.setAttribute("download", filename);
    body.appendChild(a);
    a.click();
    body.removeChild(a);
}