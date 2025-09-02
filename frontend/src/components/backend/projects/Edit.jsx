import { useEffect, useState } from "react";
import SideBar from "../../common/SideBar";
import Header from "../../common/header";
import Footer from "../../common/footer";
import Lodder from "../../common/lodder";
import { Link, useNavigate, useParams } from "react-router-dom";
import { apiUrl, fileUrl, token } from "../../common/Http";
import { toast } from "react-toastify";

export default function Edit() {
  const [isloading, setIsLoading] = useState(false);
  const params =useParams();
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    location: "",
    construction_type: "",
    sector: "",
    status: 1,
    sort_desc: "",
    content: "",
    image:'',
    imageId: null,
  });
  const [disable, setDisable] = useState(false);
  const changeFile = async (e) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const imagedata = new FormData();
    imagedata.append("image", e.target.files[0]);

    try {
      // optional: disable submit button while uploading
      // setDisable(true);
      setDisable(true);
      const response = await fetch(apiUrl + "temp-image", {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token()}`,
        },
        body: imagedata,
      });

      const data = await response.json();

      if (data.status === true) {
        setFormData((prev) => ({
          ...prev,
          imageId: data.data?.id, // store uploaded image ID
        }));
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
      setDisable(false);
      // setDisable(false);
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Image upload failed");
      // setDisable(false);
    }
  };
  const callDefaultData = async() => {
      console.log(params.id);
      
       try {
            setIsLoading(true);
            const response = await fetch(apiUrl + `project/${params.id}`, {
              method: 'GET',
              headers: {    
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'authorization': `Bearer ${token()}`
                },
                
            });
            const data = await response.json();
            console.log(data.data);
            
              setFormData({
              title: data.data.title || "",
              slug: data.data.slug || "",
              sort_desc: data.data.sort_desc || "",
              construction_type: data.data.construction_type || "",
              sector: data.data.sector || "",
              location: data.data.location || "",
              image: data.data.image || "",
              content: data.data.content || "",
              status: Boolean(data.data.status) || true,
              });      
            setIsLoading(false);
          }
          catch (error) {
            console.error('Error fetching services:', error);
            }
      
    };
  useEffect(()=>{callDefaultData()},[])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "status" ? value === "true" : value
    }));
  };
  const navigate=useNavigate();
  const handleSubmit = async(e) => {
    e.preventDefault();
     try {
          
          const response = await fetch(apiUrl + 'project/'+params.id, {
            method: 'Put',
            headers: {    
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'authorization': `Bearer ${token()}`
              },
            body: JSON.stringify(formData),     
          });
          const data = await response.json();
          console.log(formData); 
          if(data.status==true){
            toast.success(data.message)
            navigate('/admin/projects')
          }
          else{
            toast.error(data.message)
          }
          
        }
        catch (error) {
          console.error('Error fetching services:', error);
          }
  };

  return (
    <>
    <Header/>
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        <SideBar />

        {/* Main Content */}
        <div className="flex-1 p-6">
          
          <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-md">
             <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Projects / Edit</h2>
            <Link to="/admin/projects">
            <button className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-1 px-4 rounded">
                Back
            </button>
            </Link>
            </div>
            
            <hr />
            {isloading ?
            <div className='flex justify-center items-center h-80'>
              <Lodder/>
            </div>:
            <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  required
                  placeholder="Enter Title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-pink-300"
                />
              </div>

              {/* Slug */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">Slug</label>
                <input
                  type="text"
                  required
                  name="slug"
                  placeholder="Slug"
                  value={formData.slug}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-pink-300"
                />
              </div>

              {/* Grid Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Location */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Location</label>
                  <input
                    type="text"
                    name="location"
                    placeholder="Enter Location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-pink-300"
                  />
                </div>

                {/* Construction Type (Dropdown) */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Construction Type
                  </label>
                  <select
                    name="construction_type"
                    value={formData.construction_type}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-pink-300"
                  >
                    <option value="">Select Type</option>
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Industrial">Industrial</option>
                  </select>
                </div>

                {/* Sector (Dropdown) */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Sector</label>
                  <select
                    name="sector"
                    value={formData.sector}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-pink-300"
                  >
                    <option value="">Select Sector</option>
                    <option value="Private">Private</option>
                    <option value="Government">Government</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Status (Active/Inactive Dropdown) */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-pink-300"
                  >
                    <option value='true' >Active</option>
                    <option value="false">Inactive</option>
                  </select>
                </div>
              </div>

              {/* Short Description */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Short Description
                </label>
                <textarea
                  name="sort_desc"
                  placeholder="Short Description"
                  value={formData.sort_desc}
                  onChange={handleChange}
                  rows="3"
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-pink-300"
                ></textarea>
              </div>

              {/* Content */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">Content</label>
                <textarea
                  name="content"
                  placeholder="Content"
                  value={formData.content}
                  onChange={handleChange}
                  rows="6"
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-pink-300"
                ></textarea>
                {/* ⚡ Replace with Jodit/Quill editor if needed */}
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Image</label>
               <input type="file" name="" onChange={changeFile} id="" />
                 {  formData.image  && (   
                    <img src={fileUrl+'uplodes/projects/small/'+formData.image} alt='Service Image'/>
                  )}
            </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  disabled={disable}
                  className="bg-pink-500 mx-auto  text-white font-semibold py-2 px-6 rounded-lg hover:bg-pink-600 transition"
                >
                  SUBMIT
                </button>
              </div>
            </form>}
            
          </div>
        </div>
      </div>
    <Footer/>
    </>
  );
}
