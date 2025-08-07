const urlToObject = async (image: string, name: string): Promise<File> => {
    const response = await fetch(image);
    const blob = await response.blob();
    return new File([blob], name, { type: blob.type });
};

export default urlToObject;
