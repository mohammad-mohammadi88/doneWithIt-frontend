const hasInternalBack = (): boolean => {
    const historyStack = JSON.parse(sessionStorage.getItem("history") || "[]");
    return historyStack.length >= 2;
};

export default hasInternalBack