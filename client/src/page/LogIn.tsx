import axios from "axios";
import { Formik } from "formik";
import { MdInfo } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Login = ({ setUser }: { setUser: any }) => {
  const navigate = useNavigate();
  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900">
          <img className="w-8 h-8 mr-2" src="./vite.svg" alt="logo" />
          Dhanwis
        </a>
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">Sign in to your account</h1>
            <Formik
              initialValues={{
                phone: "",
                password: "",
              }}
              onSubmit={(values, { resetForm }) => {
                axios
                  .post("/user/auth?type=login", values)
                  .then((response) => {
                    resetForm();
                    setUser({
                      phone: response.data.userData.phone,
                      name: response.data.userData.name,
                      logged: true,
                    });
                    navigate("/");
                  })
                  .catch((err) => {
                    toast.error(err?.response.data.message || err.message);
                  });
              }}
            >
              {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
                <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">
                      Phone
                    </label>
                    <input
                      type="text"
                      name="phone"
                      id="phone"
                      value={values.phone}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder="Enter your phone number..."
                    />

                    {errors.phone && touched.phone && (
                      <span className="text-xs text-red-500 font-bold flex items-center gap-1 mt-1">
                        <MdInfo className="w-4 h-4" /> Error occur
                      </span>
                    )}
                  </div>
                  <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      value={values.password}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    />

                    {errors.password && touched.password && (
                      <span className="text-xs text-red-500 font-bold flex items-center gap-1 mt-1">
                        <MdInfo className="w-4 h-4" /> Error occur
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <a href="#" className="text-sm font-medium text-primary-600 hover:underline">
                      Forgot password?
                    </a>
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white bg-blue-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Sign in
                  </button>
                  <p className="text-sm font-light text-gray-500">
                    Don’t have an account yet?{" "}
                    <Link to="/sign-up" className="font-medium text-primary-600 hover:underline">
                      Sign up
                    </Link>
                  </p>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
