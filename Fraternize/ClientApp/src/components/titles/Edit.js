import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import { Button } from 'reactstrap';




export class EditTitle extends Component {


    constructor(props) {
        super(props);
        this.state = {
            title: {}
        };

        axios.get(`api/Titles/${this.props.match.params.titleId}`)
            .then(res => {
                const title = res.data;
                this.setState({ title });
            })

    }

   

    render() {
        return (
            <div>
                <h4>Edit Title</h4>

                <Formik
                    initialValues={this.state.title}
                    enableReinitialize={true}
                    validate={values => {
                        const errors = {};
                        if (!values.name) {
                            errors.name = 'Required';
                        }
                        return errors;
                    }}

                    onSubmit={(values, { setSubmitting }) => {

                        axios.put(`api/Titles/${this.props.match.params.titleId}`,
                            values).then( (response) => {
                                if (response.status == 200) {
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
                                        <label htmlFor="name" className="control-label">Title Name</label>
                                        <Field type="text" className="form-control" name="name" />
                                        <ErrorMessage name="name" component="div" />
                                    </div>
                                    <div className="form-group">
                                        <Button type="submit" className="btn btn-default">Edit</Button>
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