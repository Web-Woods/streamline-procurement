'use client'

// Import necessary libraries and modules
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { REGISTER_NEW_USER } from "@/gql/mutation";
import { useMutation } from '@apollo/client';
import client from '@/gql/client';
import { setCookie } from 'nookies';
import { Button, Checkbox, Input, Link, Spinner } from '@nextui-org/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import { isValidEmail } from '@/util/email.validate';

// Functional component for the registration form
function SignupForm() {
  // Use Apollo Client's useMutation hook for the registration mutation
  const [registrationMutation] = useMutation(REGISTER_NEW_USER, { client: client });

  // State variables to manage form input, visibility, and registration success
  const [isVisible, setIsVisible] = React.useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
  const [isConfirmPasswordInvalid, setIsConfirmPasswordInvalid] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Next.js router instance for navigation
  const router = useRouter();

  // Function to toggle password visibility
  const toggleVisibility = () => setIsVisible(!isVisible);

  // Function to handle the registration process
  const handleRegistration = async () => {
    try {
      // Validate email and password
      if (!email || !isValidEmail(email)) {
        setIsEmailInvalid(true);
      }

      if (!password) {
        setIsPasswordInvalid(true);
      }

      if (!confirmPassword) {
        setIsConfirmPasswordInvalid(true);
        return;
      }

      if (password !== confirmPassword) {
        throw new Error('Passwords don\'t match!');
      }

      // Store or remove the remembered email based on the "Remember Me" checkbox
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }

      // Perform the registration mutation
      const response = await registrationMutation({
        variables: {
          email: email,
          password: password,
        },
      });

      // Extract and set the verification token from the registration response
      const token = response?.data?.registerNewUser?.verificationToken;

      if (token) {
        setCookie(null, "code", token, { path: "/" });
        setCookie(null, "currentUserEmail", email, { path: "/" });
      } else {
        setRegistrationSuccess(false);
        return;
      }

      setRegistrationSuccess(true);
    } catch (error: any) {


      console.log(error);
      throw new Error(error);
    }
  };

  // Function to handle changes in the "Remember Me" checkbox
  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  // Effect hook to pre-fill the email field if it was remembered
  useEffect(() => {
    const storedEmail = localStorage.getItem('rememberedUsername');
    if (storedEmail) {
      setEmail(storedEmail);
      setRememberMe(true);
    }
  }, []);

  // Effect hook to redirect to the verification after a successful registration
  useEffect(() => {
    const redirectToVerification = async () => {
      if (registrationSuccess) {
        // Delay the redirection for a better user experience
        await new Promise(resolve => setTimeout(resolve, 2000));
        router.push('/auth/verify');
      }
    };

    redirectToVerification();
  }, [registrationSuccess, router]);

  // Render the login form component
  return (
    <div className='h-screen bg-white flex flex-col gap-5 justify-center items-center'>
      <div className='w-[20rem] sm:w-[25rem] bg-white px-5 py-10 rounded-xl'>
        <div className='flex flex-col justify-center items-center mb-10'>
          {/* Company logo */}
          <Image
            src="/nifs_logo.png"
            alt="Company Logo"
            width={150}
            height={150}
          />
          {/* Display welcome message if not a successful login */}
          {!registrationSuccess && (
            <>
              <h2 className='mt-5 text-2xl font-semibold'>Join with us!</h2>
              <p className='text-sm text-gray-400 font-normal'>
                Already a member? <Link href='/auth/login' className='text-sm font-semibold text-[#197dfd]'>Sign in</Link>
              </p>
            </>
          )}
        </div>
        {/* Display login form or loading spinner based on login success */}
        {!registrationSuccess ? (
          <>
            <form className='flex flex-col gap-3'>
              {/* Email input */}
              <Input
                label='Email'
                labelPlacement='outside'
                placeholder='Enter your email'
                isRequired={true}
                value={email}
                autoComplete='email' // Enable browser autocomplete for email
                onValueChange={(value: string) => {
                  setIsEmailInvalid(false);
                  setEmail(value);
                }}
                isInvalid={isEmailInvalid}
                errorMessage={isEmailInvalid ? "Please enter a valid email" : ''}
              />
              {/* Password input */}
              <Input
                label='Password'
                labelPlacement='outside'
                placeholder='Enter your password'
                isRequired={true}
                value={password}
                autoComplete='current-password' // Enable browser autocomplete for password
                onValueChange={(value: string) => {
                  setIsPasswordInvalid(false);
                  setPassword(value);
                }}
                isInvalid={isPasswordInvalid}
                errorMessage={isPasswordInvalid ? "Please enter the correct password" : ''}
                endContent={
                  <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                    {/* Toggle password visibility icon */}
                    {isVisible ? (
                      <FontAwesomeIcon icon={faEyeSlash} />
                    ) : (
                      <FontAwesomeIcon icon={faEye} />
                    )}
                  </button>
                }
                type={isVisible ? "text" : "password"}
              />
              {/* Confirm Password input */}
              <Input
                label='Confirm Password'
                labelPlacement='outside'
                placeholder='Enter your password again'
                isRequired={true}
                value={confirmPassword}
                onValueChange={(value: string) => {
                  setIsConfirmPasswordInvalid(false);
                  setConfirmPassword(value);
                }}
                isInvalid={isConfirmPasswordInvalid}
                errorMessage={isConfirmPasswordInvalid ? "Please enter the correct password" : ''}
                endContent={
                  <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                    {/* Toggle password visibility icon */}
                    {isVisible ? (
                      <FontAwesomeIcon icon={faEyeSlash} />
                    ) : (
                      <FontAwesomeIcon icon={faEye} />
                    )}
                  </button>
                }
                type={isVisible ? "text" : "password"}
              />
              {/* Keep me signed in checkbox and Forgot Password link */}
              <div className='flex justify-between'>
                <div className='flex items-center'>
                  {/* Keep me signed in checkbox */}
                  <Checkbox
                    checked={rememberMe}
                    onChange={handleRememberMeChange}
                  />
                  <label className='text-sm'>Keep me signed in</label>
                </div>
              </div>
            </form>
            {/* Sign Up button */}
            <Button
              className='w-full bg-ctertiary text-white text-md mt-10 hover:bg-accent-yellow hover:text-cprimary'
              onClick={() => handleRegistration()}
            >
              Sign up
            </Button>
          </>
        ) :
          <div className='align-center flex flex-col justify-center gap-5'>
            {/* Loading spinner and redirection message */}
            <p className='text-xs text-center'>You will be redirected for verification shortly...</p>
            <Spinner color='primary' />
          </div>}
      </div>
      {/* Powered by StreamLine message */}
      <p className='text-center text-[#197dfd] text-sm'>
        Powered by <span>StreamLine</span>
      </p>
    </div>
  );
}

// Export the SignupForm component as the default export
export default SignupForm;
