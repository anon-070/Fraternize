import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import { Button } from 'reactstrap';
import { CustomSelect, CustomDatePicker } from "./CustomWidgets";



export class CreateMemberData extends Component {

    selectValues;

    constructor(props) {
        super(props);
        this.state = { selectValues: { chapterIds: [], professionIds: [], titleIds: [], committeeIds: [] } }
    

    }

    componentDidMount() {
        axios.get(`api/MemberData/Create`)
            .then(res => {
                this.setState({ selectValues: res.data });
            });
    }

    render() {
        return (
            <div>
                <h4>Create Member</h4>
                <Formik
                    initialValues={{}}
                    validate={values => {
                        const errors = {};
                        //if (!values.Name) {
                        //    errors.Name = 'Required';
                        //}
                        return errors;
                    }}

                    onSubmit={(values, { setSubmitting }) => {

                        axios.post('/api/MemberData', values).then((response) => {
                            if (response.status == 201) {
                                this.props.history.push("/members");
                            }
                        });
                        setSubmitting(false);

                    }}
                >

                    {({ isSubmitting }) => (
                        <div className="row">
                            <div className="col-md-4">
                                <Form>
                                    <div asp-validation-summary="ModelOnly" className="text-danger"></div>

                                    <div className="form-group">
                                        <label htmlFor="CardNumber" className="control-label">Card Number</label>
                                        <Field type="text" name="CardNumber" className="form-control" />
                                        <ErrorMessage name="CardNumber" component="div" />
                                    </div>


                                    <div className="form-group">
                                        <label htmlFor="Titles" className="control-label">Titles</label>
                                        <Field name="Titles" component={CustomSelect} options={this.state.selectValues.titleIds} isMulti="true" />
                                        <ErrorMessage name="Titles" component="div" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="SurName" className="control-label">Surname</label>
                                        <Field type="text" name="SurName" className="form-control" />
                                        <ErrorMessage name="SurName" component="div" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="OtherNames" className="control-label">Other Names</label>
                                        <Field type="text" name="OtherNames" className="form-control" />
                                        <ErrorMessage name="OtherNames" component="div" />
                                    </div>

                     
                                    <div className="form-group">
                                        <label htmlFor="ProfessionId" className="control-label">Profession</label>
                                        <Field component={CustomSelect} name="ProfessionId" options={this.state.selectValues.professionIds} />
                                        <ErrorMessage name="ProfessionId" component="div" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="DateofBirth" className="control-label">Date Of Birth </label>
                                        <CustomDatePicker name="DateofBirth" className="form-control" />
                                        <ErrorMessage name="DateofBirth" component="div" />
                                    </div>


                                    <div className="form-group">
                                        <label htmlFor="DateofWedding" className="control-label">Date of Wedding </label>
                                        <CustomDatePicker name="DateofWedding" className="form-control" />
                                        <ErrorMessage name="DateofWedding" component="div" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="ResidenceLocation" className="control-label">Residence Location</label>
                                        <Field type="text" name="ResidenceLocation" className="form-control" />
                                        <ErrorMessage name="ResidenceLocation" component="div" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="CellPhoneNumber" className="control-label">Cell Phone Number</label>
                                        <Field type="text" name="CellPhoneNumber" className="form-control" />
                                        <ErrorMessage name="CellPhoneNumber" component="div" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="HomePhoneNumber" className="control-label">Home Phone Number</label>
                                        <Field type="text" name="HomePhoneNumber" className="form-control" />
                                        <ErrorMessage name="HomePhoneNumber" component="div" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="EmailAddress" className="control-label">Email Address</label>
                                        <Field type="text" name="EmailAddress" className="form-control" />
                                        <ErrorMessage name="EmailAddress" component="div" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="PostalAddress" className="control-label">Postal Address</label>
                                        <Field type="text" name="PostalAddress" className="form-control" />
                                        <ErrorMessage name="PostalAddress" component="div" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="DateofFullMembership" className="control-label">Date of Full Membership </label>
                                        <CustomDatePicker name="DateofFullMembership" className="form-control datepicker" />
                                        <ErrorMessage name="DateofFullMembership" component="div" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="Committees" className="control-label">Committees</label>
                                        <Field component={CustomSelect} name="Committees" name="Committees" options={this.state.selectValues.committeeIds} isMulti="true" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="ChapterId" className="control-label">Chapter</label>
                                        <Field component={CustomSelect} name="ChapterId" options={this.state.selectValues.chapterIds} />

                                    </div>
                                    <div className="form-group">
                                        <Button type="submit" className="btn btn-default">Create</Button>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    )
                    }

                </ Formik>
            </div>
        )
    }
}




