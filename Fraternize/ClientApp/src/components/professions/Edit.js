import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import { Button } from 'reactstrap';




export class EditProfession extends Component {


    constructor(props) {
        super(props);
        this.state = {
            profession: {}
        };

        axios.get(`api/Professions/${this.props.match.params.professionId}`)
            .then(res => {
                const profession = res.data;
                this.setState({ profession });
            })

    }

   

    render() {
        return (
            <div>
                <h4>Edit Profession</h4>

                <Formik
                    initialValues={this.state.profession}
                    enableReinitialize={true}
                    validate={values => {
                        const errors = {};
                        if (!values.name) {
                            errors.name = 'Required';
                        }
                        return errors;
                    }}

                    onSubmit={(values, { setSubmitting }) => {

                        axios.put(`api/Professions/${this.props.match.params.professionId}`,
                            values).then( (response) => {
                                if (response.status == 200) {
                                    this.props.history.push("/professions");
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
                                        <label htmlFor="name" className="control-label">Profession Name</label>
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