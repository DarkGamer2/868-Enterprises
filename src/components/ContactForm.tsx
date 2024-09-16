import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const ContactForm = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const navigate = useNavigate();
  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    await axios
      .post("http://localhost:4900/api/request/quote", {
        firstName,
        lastName,
        email,
        message: "Contact Request from the website", // replace with actual message content
      })
      .then((response) => {
        console.log(response);
        navigate("/confirmed");
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to send request. Please try again later."); // replace with actual error handling mechanism
      });
  };
  return (
    <div>
      <h1 className="text-center">Request A Quote</h1>
      <section>
        <form>
          <div>
            <label>First Name:</label>
            <input
              type="text"
              name="firstName"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <label>Last Name:</label>
            <input
              type="text"
              name="lastName"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <textarea>
              Please provide a detailed description of your project, any
              specific features you would like to include, and any budget
              constraints.
            </textarea>
          </div>
          <div>
            <button type="submit" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default ContactForm;
