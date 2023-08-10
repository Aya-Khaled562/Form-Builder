
export default class AbstractElementFactory {
    createSingleLineOfText(obj) { throw new Error("Method not implemented"); }
    createOptionSet(obj) { throw new Error("Method not implemented"); }
    createTwoOptions(obj) { throw new Error("Method not implemented"); }
    createDecimalNumber(obj) { throw new Error ("Method not implemented"); }
    createMultipleLineOfText(obj) { throw new Error("Method not implemented"); }
    createDateAndTime(obj) { throw new Error ("Method not implemented"); }
    createTab(obj) { throw new Error("Method not implemented"); }
    createSection(obj) { throw new Error("Method not implemented"); }
    createColumn(obj) { throw new Error("Method not implemented"); }

    createFileUpload(obj) { throw new Error("Method not implemented"); }
    createImage(obj) { throw new Error("Method not implemented"); }

    createEmail(obj) { throw new Error("Method not implemented"); }
    createPassword(obj){ throw new Error("Method not implemented"); }
    createPhoneNumber(obj) { throw new Error("Method not implemented"); }

    buildContent(type, element){ throw new Error("Method not implemented"); }
}