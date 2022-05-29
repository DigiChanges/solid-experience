import { createMemo, JSX } from 'solid-js';
import { SelectValueOption } from '../types/Selects';
import { SelectTransform } from '../utils/SelectTransform';

function useTransformTranslatedOptions ( elements: any[], renderLabel: ( item: SelectValueOption ) => JSX.Element | string )
{
    const filterOptions = createMemo( () => SelectTransform.getOptionsObjectArray<SelectValueOption>(
        elements,
        ( item ) => renderLabel( item ) as string,
        ( item ) => item.value
    ) );
    return ( { filterOptions } );
}

export default useTransformTranslatedOptions;
