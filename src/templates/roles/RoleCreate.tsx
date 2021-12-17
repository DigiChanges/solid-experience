// import Router from "next/router";
// import ButtonClose from '../../molecules/ButtonClose';
// import ButtonConfirm from '../../molecules/ButtonConfirm';
// import MultiSelect from '../../atoms/MultiSelect';
// import { SelectTransform } from '../../transforms/default';
// import SelectStyle from '../../assets/customStyles/SelectStyle';
// import SimpleSelect from '../../atoms/SimpleSelect';
// import { states } from "../../entities";
import Title from '../../atoms/Title';
import { Component } from 'solid-js';
import Button from '../../atoms/Button';
import Input from '../../atoms/Input';
import { Form } from 'solid-js-form';
import RoleSchema from '../../SchemaValidations/RoleSchema';
import ButtonClose from '../../molecules/ButtonClose';
import ButtonConfirm from '../../molecules/ButtonConfirm';
import { useNavigate } from 'solid-app-router';

interface RoleCreateTemplateProps {
    permissionsList?: string[];
    createAction: any;
}

const RoleCreate: Component<RoleCreateTemplateProps> = props =>
{
    const navigate = useNavigate();
    return (
        <section class="px-4">
            <div class="mb-2 ">
                <Title class="text-3xl font-bold" titleType="h1">
                    Create Role
                </Title>
            </div>

            <Form

                initialValues={{
                    name: '',
                    slug: '',
                    permissions: [],
                    enable: false
                }}
                validation={RoleSchema}
                onSubmit={( forms ) =>
                {
                    props.createAction( forms.values );

                }}

            >

                <div class="flex flex-wrap text-sm">
                    <div class="dg-form-full-field-wrapper">
                        <Input
                            name="name"
                            type="text"
                            id="name"
                            class="dg-form-field-full"
                            placeholder="Enter name"
                            labelClass="text-main-gray-200 block mb-2"
                            labelName="Name"
                        />
                    </div>
                    <div class="dg-form-full-field-wrapper">
                        <Input
                            name="slug"
                            type="text"
                            id="slug"
                            class="dg-form-field-full"
                            placeholder="Enter slug"
                            labelClass="text-main-gray-200 block mb-2"
                            labelName="Slug"
                        />
                    </div>
                    {/* <div class="dg-form-full-field-wrapper">
                                <Label htmlFor="permissions" class="dg-form-label">
                                    Permissions
                                </Label>
                                <Input
                                    name="permissions"
                                    id="permissions"
                                    component={MultiSelect}
                                    options={SelectTransform.getOptionsSimpleArray(permissionsList)}
                                    isMulti
                                    placeholder="Select permissions"
                                    selectStyle={SelectStyle}
                                />
                            </div> */}
                    {/* <div class="dg-form-quarter-field-wrapper">

                        <Input
                            name="enable"
                            id="enable"
                            component={SimpleSelect}
                            selectStyle={SelectStyle}
                            options={states}
                        />
                    </div> */}
                    <div class="w-full mt-5 flex justify-end">
                        <ButtonClose onClick={() => navigate( '/roles', { replace : true } )}>
                            Close
                        </ButtonClose>
                        <ButtonConfirm type="submit">Save</ButtonConfirm>
                    </div>
                </div>
            </Form>


        </section>
    );
};

export default RoleCreate;
