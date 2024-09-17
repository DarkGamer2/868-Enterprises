import React from 'react';
import NavigationBar from '../components/NavigationBar';
import { Link } from 'react-router-dom';
const Confirmation: React.FC = () => {
    return (
        <div>
            <NavigationBar/>
            <h1 className='text-center font-bold'>Confirmation Page</h1>
            <p>Thank you for your order!</p>
            <p>We have received your order and will process it shortly.</p>
            <p>An email with the order details will be sent to you.</p>
            <p>If you have any questions, please contact our customer support.</p>
            <div className='text-center'>
            <Link to="/">
            <button className='bg-green-500 py-2 px-2 rounded-md text-white'>Go Home</button></Link>
            </div>
        </div>
    );
};

export default Confirmation;