import React, { useState } from 'react'
import { Col, Row, Container, Alert } from 'react-bootstrap';
import contactImg from "../assets/img/contact-img.svg";
import { sendMail } from '../server.js';
function Contact() {
    const formInitialDetails = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: ''
    }
    const [formDetails, setFormDetails] = useState(formInitialDetails);
    const [buttonText, setButtonText] = useState('Send');
    const [status, setStatus] = useState({});

    const onFormUpdate = (category, value) => {
        setFormDetails({
            ...formDetails,
            [category]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setButtonText("Sending...");

            var result = sendMail(formDetails);
            if (result) {
                setStatus({ succes: true, message: 'Message sent successfully' });
            } else {
                setStatus({ succes: false, message: 'Something went wrong, please try again later or contact me in mohamedamine.guesmi@insat.ucar.tn' });
                setTimeout(() => {
                    setButtonText("Send ")
                }, 2500)
            }
        }
        catch (e) {
            setStatus({
                succes: false, message: 'Something went wrong, please try again later or contact me in mohamedamine.guesmi@insat.ucar.tn'
            });
            setTimeout(() => {
                setButtonText("Send ")
            }, 2500)
        }

    };
    return (
        <section className='contact' id="contact">
            <Container>
                <Row className="align-items-center">
                    <Col md={6}>
                        <img src={contactImg} alt='contact'>

                        </img>
                    </Col>
                    <Col md={6}>
                        <h2>
                            Get In Touch
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <Row>
                                <Col sm={6} className="px-3">
                                    <input type="text" value={formDetails.firstName} placeholder='First Name' onChange={(e) => onFormUpdate('firstName', e.target.value)} />

                                </Col>
                                <Col sm={6} className="px-3">
                                    <input type="text" value={formDetails.lastName} placeholder='Last Name' onChange={(e) => onFormUpdate('lastName', e.target.value)} />
                                </Col>
                                <Col sm={6} className="px-3">
                                    <input type="email" value={formDetails.email} placeholder='Email Address' onChange={(e) => onFormUpdate('email', e.target.value)} />
                                </Col>
                                <Col sm={6} className="px-3">
                                    <input type="tel" value={formDetails.phone} placeholder='Phone Number' onChange={(e) => onFormUpdate('phone', e.target.value)} />
                                </Col>
                                <Col>
                                    <textarea row="6" value={formDetails.message} placeholder='Message' onChange={(e) => onFormUpdate('message', e.target.value)}></textarea>
                                    <button type='submit'>
                                        <span>
                                            {buttonText}
                                        </span>
                                    </button>
                                </Col>
                            </Row>
                            <br />
                            <br />
                            {console.log(status.succes)}
                            {

                                status.message &&
                                <Col>
                                    <Alert variant={status.success === false ? "success" : "danger"}>{status.message}</Alert>
                                </Col>
                            }
                        </form>
                    </Col>
                </Row>
            </Container>

        </section>
    )
}

export default Contact
