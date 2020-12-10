import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import { Button } from 'reactstrap';


export class CreateTitle extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
            <h4>Create Title</h4>

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
                        
                    axios.post('/api/Titles', values).then((response) => {
                        if (response.status == 201) {
                            this.props.history.push("/titles");
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
                                        <label htmlFor="Name" className="control-label">Title Name</label>
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