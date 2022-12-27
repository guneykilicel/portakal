import React, { useEffect } from 'react'
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import Reviews from './Reviews'
import AddReview from './AddReview'

const ReviewsPageModal = ({ state, setState, reviews }) => {

    return (
        state ? (
            <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="fixed inset-0 w-full h-full bg-black opacity-40" onClick={() => setState(false)}></div>
                <div className="flex items-center min-h-screen px-4 py-8">
                    <div className="relative w-full max-w-4xl p-4 mx-auto bg-zinc-50 rounded-md shadow-lg">

                        <AddReview />
                        {/* <div className=''>
                        <div className="flex flex-col max-w-xl p-8 shadow-sm rounded-xl lg:p-12 dark:bg-gray-900 dark:text-gray-100 mx-auto">
                            <div className="flex flex-col w-full">
                                <h2 className="text-3xl font-semibold text-center">Customer reviews</h2>
                                <div className="flex flex-wrap items-center mt-2 mb-1 space-x-2">
                                    <div className="flex">
                                        <button type="button" title="Rate 1 stars" aria-label="Rate 1 stars">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 dark:text-yellow-500">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                            </svg>
                                        </button>
                                        <button type="button" title="Rate 2 stars" aria-label="Rate 2 stars">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 dark:text-yellow-500">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                            </svg>
                                        </button>
                                        <button type="button" title="Rate 3 stars" aria-label="Rate 3 stars">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 dark:text-yellow-500">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                            </svg>
                                        </button>
                                        <button type="button" title="Rate 4 stars" aria-label="Rate 4 stars">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 dark:text-gray-600">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                            </svg>
                                        </button>
                                        <button type="button" title="Rate 5 stars" aria-label="Rate 5 stars">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 dark:text-gray-600">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                            </svg>
                                        </button>
                                    </div>
                                    <span className="dark:text-gray-400">3 out of 5</span>
                                </div>
                                <p className="text-sm dark:text-gray-400">861 global ratings</p>
                                <div className="flex flex-col mt-4">
                                    <div className="flex items-center space-x-1">
                                        <span className="flex-shrink-0 w-12 text-sm">5 star</span>
                                        <div className="flex-1 h-4 overflow-hidden rounded-sm dark:bg-gray-700">
                                            <div className="dark:bg-orange-300 h-4 w-5/6"></div>
                                        </div>
                                        <span className="flex-shrink-0 w-12 text-sm text-right">83%</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <span className="flex-shrink-0 w-12 text-sm">4 star</span>
                                        <div className="flex-1 h-4 overflow-hidden rounded-sm dark:bg-gray-700">
                                            <div className="dark:bg-orange-300 h-4 w-4/6"></div>
                                        </div>
                                        <span className="flex-shrink-0 w-12 text-sm text-right">67%</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <span className="flex-shrink-0 w-12 text-sm">3 star</span>
                                        <div className="flex-1 h-4 overflow-hidden rounded-sm dark:bg-gray-700">
                                            <div className="dark:bg-orange-300 h-4 w-3/6"></div>
                                        </div>
                                        <span className="flex-shrink-0 w-12 text-sm text-right">50%</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <span className="flex-shrink-0 w-12 text-sm">2 star</span>
                                        <div className="flex-1 h-4 overflow-hidden rounded-sm dark:bg-gray-700">
                                            <div className="dark:bg-orange-300 h-4 w-2/6"></div>
                                        </div>
                                        <span className="flex-shrink-0 w-12 text-sm text-right">33%</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <span className="flex-shrink-0 w-12 text-sm">1 star</span>
                                        <div className="flex-1 h-4 overflow-hidden rounded-sm dark:bg-gray-700">
                                            <div className="dark:bg-orange-300 h-4 w-1/6"></div>
                                        </div>
                                        <span className="flex-shrink-0 w-12 text-sm text-right">17%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div> */}


                        <div className="flex w-full mt-5">
                            {/* grid grid-cols-5 grid-flow-row gap-5
                            <div className="flex items-center justify-center w-12 h-12 mx-auto bg-green-100 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="mt-2 text-center">
                                <h4 className="text-lg font-medium text-gray-800">
                                    Successfully accepted!
                                </h4>
                                <p className="mt-2 text-[15px] leading-relaxed text-gray-500">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nunc eget lorem dolor sed viverra ipsum nunc. Consequat id porta nibh venenatis.
                                </p>
                            </div> */}
                            <Reviews reviews={reviews} />
                        </div>
                        {/* <div className="items-center gap-2 mt-3 sm:flex">
                            <button className="w-full mt-2 p-2.5 flex-1 text-white bg-indigo-600 rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2"
                                onClick={() => setState(false)}
                            >
                                Dashboard
                            </button>
                            <button className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
                                onClick={() => setState(false)}
                            >
                                Undo
                            </button>
                        </div> */}
                    </div>
                </div>
            </div>
        ) : ''
    )
}
export default ReviewsPageModal