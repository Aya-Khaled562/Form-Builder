

    export async function getJson(path) {
        const response = await fetch(path);
        return await response.json();
    }

    export function download(jsonData, type_of = "text/plain", filename = "data.txt") {
        // console.log('json: ', jsonData);
        let body = document.body;
        const a = document.createElement("a");
        // console.log('stringfy',JSON.stringify(jsonData))
        a.href = URL.createObjectURL(new Blob([JSON.stringify(jsonData, null, 2)], {
            type: type_of
        }));
        a.setAttribute("download", filename);
        body.appendChild(a);
        a.click();
        body.removeChild(a);
    }

    export function rotateIcon(e) {
        console.log(document.querySelector('.fa-caret-right'))
        document.querySelector('.fa-caret-right').transform = 'rotate(20deg)';
    }


    export function createElementFactoryPropertiesObj(id, name, customClass, style, mode) {

        if (arguments.length == 1) {
            return {
                id: arguments[0].Id,
                name: arguments[0].Name,
                customClass: arguments[0].CustomClass,
                style: arguments[0].Style,
                mode: arguments[0].Mode,
                required: arguments[0].Required,
                value: arguments[0].Value,
                optionsSetValues: arguments[0].OptionsSetValues,
                visible: arguments[0].Visible,
                readOnly: arguments[0].ReadOnly
            }
        }
        return {
            id: id,
            name: name,
            customClass: customClass,
            style: style,
            mode: mode
        }
    }