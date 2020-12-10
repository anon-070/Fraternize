import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import { Button } from 'reactstrap';


export class CreateCommittee extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
            <h4>Create Committee</h4>

            <Formik
                initialValues={{Name:''}}
                validate={values => {
                    const errors = {};
                    if (!values.Name) {
                        errors.Name = 'Required';
                    }
                    return errors;
                }}

                onSubmit={(values, { setSubmitting }) => {
                        
                    axios.post('/api/Committees', values).then((response) => {
                        if (response.status == 201) {
                            this.props.history.push("/committees");
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
                                        <label htmlFor="Name" className="control-label">Committee Name</label>
                                        <Field type="text" name="Name" className="form-control" />
                                    <ErrorMessage name="Name" component="div" />
                                </div>
                                <div className="form-group">
                                    <Button type="submit"className="btn btn-default">Create</Button>
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