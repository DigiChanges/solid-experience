
type setValue = ( name: string, value: any ) => void;

export const handleSelect = ( { setValue }: { setValue: setValue } ) => ( event: any ) =>
{
    const { name, value } = event.target;
    setValue( name, value );
};
