import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('customer');
  const [message, setMessage] = useState({ type: '', text: '' });
  const [shopData, setShopData] = useState({
    shopName: '',
    ownerName: '',
    phone: '',
    email: '',
    password: ''
  });
  const [customerData, setCustomerData] = useState({
    name: '',
    address: '',
    phone: '',
    dob: '',
    age: '',
    email: '',
    password: ''
  });

  const [deliveryData, setDeliveryData] = useState({
    name: '',
    address: '',
    phone: '',
    vehicleType: '',
    vehicleNumber: '',
    email: '',
    password: ''
  });

  const [farmerData, setFarmerData] = useState({
    name: '',
    address: '',
    phone: '',
    farmName: '',
    email: '',
    password: ''
  });

  // Calculate age automatically when DOB changes
  useEffect(() => {
    if (customerData.dob) {
      const birthDate = new Date(customerData.dob);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      setCustomerData(prev => ({ ...prev, age: age >= 0 ? age : 0 }));
    }
  }, [customerData.dob]);

  const handleCustomerChange = (e) => {
    const { name, value } = e.target;
    setCustomerData(prev => ({ ...prev, [name]: value }));
  };

  const handleShopChange = (e) => {
    const { name, value } = e.target;
    setShopData(prev => ({ ...prev, [name]: value }));
  };

  const handleDeliveryChange = (e) => {
    const { name, value } = e.target;
    setDeliveryData(prev => ({ ...prev, [name]: value }));
  };

  const handleFarmerChange = (e) => {
    const { name, value } = e.target;
    setFarmerData(prev => ({ ...prev, [name]: value }));
  };

  const handleCustomerSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5510/grocery/register/customer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customerData)
      });
      const data = await response.json();
      if (data.success) {
        setMessage({ type: 'success', text: 'Registration successful! Redirecting to login...' });
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setMessage({ type: 'error', text: data.message || 'Registration failed' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Server error. Please try again later.' });
    }
  };

  const handleShopSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5510/grocery/register/shop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(shopData)
      });
      const data = await response.json();
      if (data.success) {
        setMessage({ type: 'success', text: 'Shop registered successfully! Redirecting to login...' });
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setMessage({ type: 'error', text: data.message || 'Registration failed' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Server error. Please try again later.' });
    }
  };

  const handleDeliverySubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5510/grocery/register/delivery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(deliveryData)
      });
      const data = await response.json();
      if (data.success) {
        setMessage({ type: 'success', text: 'Delivery boy registered successfully! Waiting for admin approval.' });
        setTimeout(() => navigate('/login'), 3000);
      } else {
        setMessage({ type: 'error', text: data.message || 'Registration failed' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Server error. Please try again later.' });
    }
  };

  const handleFarmerSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5510/grocery/register/farmer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(farmerData)
      });
      const data = await response.json();
      if (data.success) {
        setMessage({ type: 'success', text: 'Farmer registered successfully! Waiting for admin approval.' });
        setTimeout(() => navigate('/login'), 3000);
      } else {
        setMessage({ type: 'error', text: data.message || 'Registration failed' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Server error. Please try again later.' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4 md:p-6">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-green-100">

        {/* Visual Side Panel */}
        <div className="hidden md:flex md:w-1/3 bg-green-600 p-8 flex-col justify-between text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
            <p className="text-green-100 text-sm">Experience the freshest groceries delivered right to your doorstep or manage your shop efficiently.</p>
          </div>
          <div className="relative z-10">
            <div className="w-12 h-1 bg-white/30 mb-4 rounded-full"></div>
            <p className="text-xs text-green-200">© 2026 Online Grocery Inc.</p>
          </div>

          <div className="absolute -top-10 -left-10 w-40 h-40 bg-green-500 rounded-full opacity-20"></div>
          <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-emerald-400 rounded-full opacity-10"></div>
        </div>

        {/* Form Area */}
        <div className="w-full md:w-2/3 p-8 md:p-12 relative">
          <button
            onClick={() => navigate('/')}
            className="absolute top-6 left-8 flex items-center gap-2 text-gray-400 hover:text-green-600 transition-colors font-semibold text-xs group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </button>
          <div className="mb-8 pt-4">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Create Account</h1>
            <p className="text-gray-500 text-sm">Please select your registration type</p>
          </div>

          {message.text && (
            <div className={`mb-6 p-4 rounded-xl text-sm font-semibold ${message.type === 'success' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-red-100 text-red-700 border border-red-200'}`}>
              {message.text}
            </div>
          )}

          {/* Toggle Switch */}
          <div className="flex p-1 bg-gray-100 rounded-xl mb-8">
            <button
              onClick={() => { setUserType('customer'); setMessage({ type: '', text: '' }); }}
              className={`flex-1 py-2 text-[10px] md:text-sm font-semibold rounded-lg transition-all duration-300 ${userType === 'customer' ? 'bg-white text-green-600 shadow-md' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Customer
            </button>
            <button
              onClick={() => { setUserType('shop'); setMessage({ type: '', text: '' }); }}
              className={`flex-1 py-2 text-[10px] md:text-sm font-semibold rounded-lg transition-all duration-300 ${userType === 'shop' ? 'bg-white text-green-600 shadow-md' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Shop Owner
            </button>
            <button
              onClick={() => { setUserType('delivery'); setMessage({ type: '', text: '' }); }}
              className={`flex-1 py-2 text-[10px] md:text-sm font-semibold rounded-lg transition-all duration-300 ${userType === 'delivery' ? 'bg-white text-green-600 shadow-md' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Delivery Boy
            </button>
            <button
              onClick={() => { setUserType('farmer'); setMessage({ type: '', text: '' }); }}
              className={`flex-1 py-2 text-[10px] md:text-sm font-semibold rounded-lg transition-all duration-300 ${userType === 'farmer' ? 'bg-white text-green-600 shadow-md' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Farmer
            </button>
          </div>

          {userType === 'customer' && (
            <form onSubmit={handleCustomerSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-600 uppercase ml-1">Full Name</label>
                  <input
                    type="text" name="name" required value={customerData.name} onChange={handleCustomerChange}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-600 uppercase ml-1">Phone Number</label>
                  <input
                    type="tel" name="phone" required value={customerData.phone} onChange={handleCustomerChange}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 outline-none transition-all"
                    placeholder="+1 234 567 890"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600 uppercase ml-1">Address</label>
                <textarea
                  name="address" required value={customerData.address} onChange={handleCustomerChange} rows="2"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 outline-none transition-all resize-none"
                  placeholder="Enter your full address"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-600 uppercase ml-1">Date of Birth</label>
                  <input
                    type="date" name="dob" required value={customerData.dob} onChange={handleCustomerChange}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-600 uppercase ml-1">Age (Calculated)</label>
                  <input
                    type="number" name="age" readOnly value={customerData.age}
                    className="w-full px-4 py-3 rounded-xl bg-gray-200 border border-gray-200 text-gray-600 outline-none cursor-not-allowed"
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600 uppercase ml-1">Email Address</label>
                <input
                  type="email" name="email" required value={customerData.email} onChange={handleCustomerChange}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 outline-none transition-all"
                  placeholder="john@example.com"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600 uppercase ml-1">Password</label>
                <input
                  type="password" name="password" required value={customerData.password} onChange={handleCustomerChange}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>

              <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-green-200/50 transition-all transform active:scale-95 mt-6">
                Create Customer Account
              </button>
            </form>
          )}

          {userType === 'shop' && (
            <form onSubmit={handleShopSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-600 uppercase ml-1">Shop Name</label>
                  <input
                    type="text" name="shopName" required value={shopData.shopName} onChange={handleShopChange}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 outline-none transition-all"
                    placeholder="Fresh Mart"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-600 uppercase ml-1">Owner Name</label>
                  <input
                    type="text" name="ownerName" required value={shopData.ownerName} onChange={handleShopChange}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 outline-none transition-all"
                    placeholder="Jane Smith"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600 uppercase ml-1">Phone Number</label>
                <input
                  type="tel" name="phone" required value={shopData.phone} onChange={handleShopChange}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 outline-none transition-all"
                  placeholder="+1 234 567 890"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600 uppercase ml-1">Email Address</label>
                <input
                  type="email" name="email" required value={shopData.email} onChange={handleShopChange}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 outline-none transition-all"
                  placeholder="shop@example.com"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600 uppercase ml-1">Password</label>
                <input
                  type="password" name="password" required value={shopData.password} onChange={handleShopChange}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>

              <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-green-200/50 transition-all transform active:scale-95 mt-6">
                Register Shop
              </button>
            </form>
          )}

          {userType === 'delivery' && (
            <form onSubmit={handleDeliverySubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-600 uppercase ml-1">Full Name</label>
                  <input
                    type="text" name="name" required value={deliveryData.name} onChange={handleDeliveryChange}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 outline-none transition-all"
                    placeholder="Delivery Hero"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-600 uppercase ml-1">Phone Number</label>
                  <input
                    type="tel" name="phone" required value={deliveryData.phone} onChange={handleDeliveryChange}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 outline-none transition-all"
                    placeholder="+91 999 999 9999"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600 uppercase ml-1">Address</label>
                <textarea
                  name="address" required value={deliveryData.address} onChange={handleDeliveryChange} rows="2"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 outline-none transition-all resize-none"
                  placeholder="Enter your residence address"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-600 uppercase ml-1">Vehicle Type</label>
                  <select
                    name="vehicleType" required value={deliveryData.vehicleType} onChange={handleDeliveryChange}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 outline-none transition-all"
                  >
                    <option value="">Select Type</option>
                    <option value="Bike">Bike</option>
                    <option value="Scooter">Scooter</option>
                    <option value="Cycle">Cycle</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-600 uppercase ml-1">Vehicle Number</label>
                  <input
                    type="text" name="vehicleNumber" required value={deliveryData.vehicleNumber} onChange={handleDeliveryChange}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 outline-none transition-all"
                    placeholder="KL-01-AB-1234"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600 uppercase ml-1">Email Address</label>
                <input
                  type="email" name="email" required value={deliveryData.email} onChange={handleDeliveryChange}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 outline-none transition-all"
                  placeholder="delivery@example.com"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600 uppercase ml-1">Password</label>
                <input
                  type="password" name="password" required value={deliveryData.password} onChange={handleDeliveryChange}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>

              <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-green-200/50 transition-all transform active:scale-95 mt-6">
                Register as Delivery Boy
              </button>
            </form>
          )}

          {userType === 'farmer' && (
            <form onSubmit={handleFarmerSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-600 uppercase ml-1">Full Name</label>
                  <input
                    type="text" name="name" required value={farmerData.name} onChange={handleFarmerChange}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 outline-none transition-all"
                    placeholder="Farmer Name"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-600 uppercase ml-1">Farm Name</label>
                  <input
                    type="text" name="farmName" required value={farmerData.farmName} onChange={handleFarmerChange}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 outline-none transition-all"
                    placeholder="Green Acres Farm"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600 uppercase ml-1">Phone Number</label>
                <input
                  type="tel" name="phone" required value={farmerData.phone} onChange={handleFarmerChange}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 outline-none transition-all"
                  placeholder="+91 999 999 9999"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600 uppercase ml-1">Address</label>
                <textarea
                  name="address" required value={farmerData.address} onChange={handleFarmerChange} rows="2"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 outline-none transition-all resize-none"
                  placeholder="Enter your farm address"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600 uppercase ml-1">Email Address</label>
                <input
                  type="email" name="email" required value={farmerData.email} onChange={handleFarmerChange}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 outline-none transition-all"
                  placeholder="farmer@example.com"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600 uppercase ml-1">Password</label>
                <input
                  type="password" name="password" required value={farmerData.password} onChange={handleFarmerChange}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>

              <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-green-200/50 transition-all transform active:scale-95 mt-6">
                Register as Farmer
              </button>
            </form>
          )}

          <p className="mt-8 text-center text-sm text-gray-600">
            Already have an account? {' '}
            <Link to="/login" className="text-green-600 font-bold hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;


