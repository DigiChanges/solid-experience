
const preventEnterCharacter = (keys: string[]) => (e: any) =>
{
    if (keys.includes(e.code))
    {
        e.preventDefault();
    }
};

export default preventEnterCharacter;
