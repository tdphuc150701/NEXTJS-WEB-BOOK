
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import Form from 'react-bootstrap/Form';
// import { useEffect, useState } from 'react';
// import { toast } from 'react-toastify';
// import { mutate } from "swr"


// interface IUser {
//     showModalUpdate: boolean;
//     setShowModalUpdate: (value: boolean) => void;
//     user: IUser
//     setUser: (value: IBlog | null) => void;

// }

// function UpdateUser(props: IUser) {
//     const { showModalUpdate, setShowModalUpdate, user, setUser } = props;
//     const [id, setId] = useState(1)
//     const [firstName, setFirstName] = useState('');
//     const [phone, setPhone] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');

//     useEffect(() => {
//         if (user) {
//             setId(user.id)
//             setFirstName(user.firstName)
//             setPhone(user.phone)
//             setEmail(user.email)
//             setPassword(user.password)
//         }
//     }, [user])

//     const handleSummit = () => {
//         if (!firstName) {
//             toast.error("Not empty title")
//             return;
//         }

//         if (!phone) {
//             toast.error("Not empty author")
//             return;
//         }

//         if (!email) {
//             toast.error("Not empty content")
//             return;
//         }
//         if (!password) {
//             toast.error("Not empty content")
//             return;
//         }


//     }

//     const handleCloseModal = () => {
//         setFirstName("")
//         setPhone("")
//         setEmail("")
//         setShowModalUpdate(false)
//     }

//     return (
//         <>
//             <Modal style={{ marginTop: "50px" }}
//                 show={showModalUpdate}
//                 onHide={() => setShowModalUpdate(false)}
//                 backdrop="static"
//                 keyboard={false}
//                 size="lg"
//             >
//                 <Modal.Header closeButton>
//                     <Modal.Title>Add new Blogs</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <Form>
//                         <Form.Group className="mb-3" >
//                             <Form.Label>Title</Form.Label>
//                             <Form.Control type="text" placeholder="Title"
//                                 value={firstName}
//                                 onChange={(e) => setFirstName(e.target.value)}

//                             />

//                         </Form.Group>
//                         <Form.Group className="mb-3" >
//                             <Form.Label>Author</Form.Label>
//                             <Form.Control type="text" placeholder="Author"
//                                 value={phone}
//                                 onChange={(e) => setPhone(e.target.value)} />
//                         </Form.Group>
//                         <Form.Group className="mb-3" >
//                             <Form.Label>Action</Form.Label>
//                             <Form.Control as="textarea" rows={3}
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                             />
//                         </Form.Group>
//                     </Form>
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={() => handleCloseModal()}>
//                         Close
//                     </Button>
//                     <Button variant="warning" onClick={() => handleSummit()}>Summit</Button>
//                 </Modal.Footer>
//             </Modal>
//         </>
//     );
// }

// export default UpdateUser;