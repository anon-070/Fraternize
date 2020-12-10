import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import { Button } from 'reactstrap';




export class EditMemberData extends Component {


    constructor(props) {
        super(props);
        this.state = {
            member: {}
        };

        axios.get(`api/Members/${this.props.match.params.memberId}`)
            .then(res => {
                const member = res.data;
                this.setState({ member });
            })

    }

   

    render() {
        return (
            <div>
                <h4>Edit Member</h4>

                <Formik
                    initialValues={this.state.member}
                    enableReinitialize={true}
                    validate={values => {
                        const errors = {};
                        if (!values.name) {
                            errors.name = 'Required';
                        }
                        return errors;
                    }}

                    onSubmit={(values, { setSubmitting }) => {

                        axios.put(`api/Members/${this.props.match.params.memberId}`,
                            values).then( (response) => {
                                if (response.status == 200) {
                                    this.props.history.push("/members");
                                }
                            });

                        setSubmitting(false);

                    }}
                >

                    {({ isSubmitting }) => (
                        <div className="row">
                            <div className="col-md-4">
                                <form asp-action="Edit">
                                    <div asp-validation-summary="ModelOnly" class="text-danger"></div>
                                    <input type="hidden" asp-for="MemberDataId" />

                                    <div class="form-group">
                                        <label asp-for="CardNumber" class="control-label"></label>
                                        <input asp-for="CardNumber" disabled="disabled" class="form-control" />
                                        <span asp-validation-for="CardNumber" class="text-danger"></span>
                                    </div>

                                    <div class="form-group">
                                        <label asp-for="Titles" class="control-label"></label>
                                        <select asp-for="Titles" name="Titles" class="form-control" asp-items="ViewBag.Titles" multiple="multiple"></select>
                                    </div>


                                    <div class="form-group">
                                        <label asp-for="SurName" class="control-label"></label>
                                        <input asp-for="SurName" class="form-control" />
                                        <span asp-validation-for="SurName" class="text-danger"></span>
                                    </div>
                                    <div class="form-group">
                                        <label asp-for="OtherNames" class="control-label"></label>
                                        <input asp-for="OtherNames" class="form-control" />
                                        <span asp-validation-for="OtherNames" class="text-danger"></span>
                                    </div>

                                    <div class="form-group">
                                        <label asp-for="MembershipStatus" class="control-label"></label>
                                        <select asp-for="MembershipStatus" class="form-control" asp-items="Html.GetEnumSelectList<MembershipStatus>()"><option>Select Status</option></select>
                                        <span asp-validation-for="MembershipStatus" class="text-danger"></span>
                                    </div>
                                    <div class="form-group">
                                        <label asp-for="ProfessionId" class="control-label"></label>
                                        <select asp-for="ProfessionId" class="form-control" asp-items="ViewBag.ProfessionId"></select>
                                        <span asp-validation-for="ProfessionId" class="text-danger"></span>
                                    </div>
                                    <div class="form-group">
                                        <label asp-for="DateofBirth" class="control-label"></label>
                                        <input asp-for="DateofBirth" class="form-control datepicker" />
                                        <span asp-validation-for="DateofBirth" class="text-danger"></span>
                                    </div>
                                    <div class="form-group">
                                        <label asp-for="DateofWedding" class="control-label"></label>
                                        <input asp-for="DateofWedding" class="form-control  datepicker" />
                                        <span asp-validation-for="DateofWedding" class="text-danger"></span>
                                    </div>
                                    <div class="form-group">
                                        <label asp-for="ResidenceLocation" class="control-label"></label>
                                        <input asp-for="ResidenceLocation" class="form-control" />
                                        <span asp-validation-for="ResidenceLocation" class="text-danger"></span>
                                    </div>
                                    <div class="form-group">
                                        <label asp-for="CellPhoneNumber" class="control-label"></label>
                                        <input asp-for="CellPhoneNumber" class="form-control" />
                                        <span asp-validation-for="CellPhoneNumber" class="text-danger"></span>
                                    </div>
                                    <div class="form-group">
                                        <label asp-for="HomePhoneNumber" class="control-label"></label>
                                        <input asp-for="HomePhoneNumber" class="form-control" />
                                        <span asp-validation-for="HomePhoneNumber" class="text-danger"></span>
                                    </div>
                                    <div class="form-group">
                                        <label asp-for="EmailAddress" class="control-label"></label>
                                        <input asp-for="EmailAddress" class="form-control" />
                                        <span asp-validation-for="EmailAddress" class="text-danger"></span>
                                    </div>
                                    <div class="form-group">
                                        <label asp-for="PostalAddress" class="control-label"></label>
                                        <input asp-for="PostalAddress" class="form-control" />
                                        <span asp-validation-for="PostalAddress" class="text-danger"></span>
                                    </div>
                                    <div class="form-group">
                                        <label asp-for="DateofFullMembership" class="control-label"></label>
                                        <input asp-for="DateofFullMembership" class="form-control datepicker" />
                                        <span asp-validation-for="DateofFullMembership" class="text-danger"></span>
                                    </div>

                                    <div class="form-group">
                                        <label asp-for="Ministries" class="control-label"></label>
                                        <select asp-for="Ministries" name="Ministries" class="form-control" asp-items="ViewBag.Ministries" multiple="multiple"></select>
                                    </div>

                                    <div class="form-group">
                                        <label asp-for="CellGroupId" class="control-label"></label>
                                        <select asp-for="CellGroupId" class="form-control" asp-items="ViewBag.CellGroupId"></select>
                                        <span asp-validation-for="CellGroupId" class="text-danger"></span>
                                    </div>
                                    <div class="form-group">
                                        <input type="submit" value="Save" class="btn btn-default" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    )
                    }

                </ Formik>


            </div>
        )
    }
}