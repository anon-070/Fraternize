import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import { Button } from 'reactstrap';
import { CustomSelect, CustomDatePicker } from "./CustomWidgets";


export class EditMemberData extends Component {


    constructor(props) {
        super(props);
        this.state = {
            member: {}, selectValues: { chapterIds: [], professionIds: [], titleIds: [], committeeIds: [] }

        };
    }

    async componentDidMount() {
        await axios.get(`api/MemberData/Create`)
            .then(res => {
                this.setState({ selectValues: res.data });
            });

        axios.get(`api/MemberData/${this.props.match.params.memberDataId}`)
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
                        //if (!values.name) {
                        //    errors.name = 'Required';
                        //}
                        return errors;
                    }}

                    onSubmit={(values, { setSubmitting }) => {

                        axios.put(`api/MemberData/${this.props.match.params.memberDataId}`,
                            values).then((response) => {
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
                                <Form>
                                    <div asp-validation-summary="ModelOnly" className="text-danger"></div>

                                    <div className="form-group">
                                        <label htmlFor="cardNumber" className="control-label">Card Number</label>
                                        <Field type="text" name="cardNumber" className="form-control" />
                                        <ErrorMessage name="cardNumber" component="div" />
                                    </div>


                                    {/*<div className="form-group">
                                        <label htmlFor="titles" className="control-label">Titles</label>
                                        <CustomSelect name="titles" options={this.state.selectValues.titleIds} isMulti="true" />
                                        <ErrorMessage name="titles" component="div" />
                                    </div> */}

                                    <div className="form-group">
                                        <label htmlFor="surName" className="control-label">Surname</label>
                                        <Field type="text" name="surName" className="form-control" />
                                        <ErrorMessage name="surName" component="div" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="otherNames" className="control-label">Other Names</label>
                                        <Field type="text" name="otherNames" className="form-control" />
                                        <ErrorMessage name="otherNames" component="div" />
                                    </div>


                                    <div className="form-group">
                                        <label htmlFor="professionId" className="control-label">Profession</label>
                                        <CustomSelect name="professionId" options={this.state.selectValues.professionIds} />
                                        <ErrorMessage name="professionId" component="div" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="dateofBirth" className="control-label">Date Of Birth </label>
                                        <CustomDatePicker name="dateofBirth" className="form-control" />
                                        <ErrorMessage name="dateofBirth" component="div" />
                                    </div>


                                    <div className="form-group">
                                        <label htmlFor="dateofWedding" className="control-label">Date of Wedding </label>
                                        <CustomDatePicker name="dateofWedding" className="form-control" />
                                        <ErrorMessage name="dateofWedding" component="div" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="residenceLocation" className="control-label">Residence Location</label>
                                        <Field type="text" name="residenceLocation" className="form-control" />
                                        <ErrorMessage name="residenceLocation" component="div" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="cellPhoneNumber" className="control-label">Cell Phone Number</label>
                                        <Field type="text" name="cellPhoneNumber" className="form-control" />
                                        <ErrorMessage name="cellPhoneNumber" component="div" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="homePhoneNumber" className="control-label">Home Phone Number</label>
                                        <Field type="text" name="homePhoneNumber" className="form-control" />
                                        <ErrorMessage name="homePhoneNumber" component="div" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="emailAddress" className="control-label">Email Address</label>
                                        <Field type="text" name="emailAddress" className="form-control" />
                                        <ErrorMessage name="emailAddress" component="div" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="postalAddress" className="control-label">Postal Address</label>
                                        <Field type="text" name="postalAddress" className="form-control" />
                                        <ErrorMessage name="postalAddress" component="div" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="dateofFullMembership" className="control-label">Date of Full Membership </label>
                                        <CustomDatePicker name="dateofFullMembership" className="form-control datepicker" />
                                        <ErrorMessage name="dateofFullMembership" component="div" />
                                    </div>

                                    {/*<div className="form-group">
                                        <label htmlFor="committees" className="control-label">Committees</label>
                                        <CustomSelect name="committees" options={this.state.selectValues.committeeIds} isMulti="true" />
                                    </div>*/}

                                    <div className="form-group">
                                        <label htmlFor="chapterId" className="control-label">Chapter</label>
                                        <CustomSelect name="chapterId" options={this.state.selectValues.chapterIds} />

                                    </div>
                                    <div className="form-group">
                                        <Button type="submit" className="btn btn-default">Save</Button>
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