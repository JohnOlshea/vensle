import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";

import Table from './Table'

const Chats = () => {
  
  
  return (
      <div className="grid h-full absolute inset-0 grid-cols-1">
	  <div className="flex">
	        <div className="w-full pt-[103px] bg-[#fbf8ff] md:w-[40%]">
	           <div className="pt-[9px] border-t border-t-4 border-[#eeeeee]">
		       <Table />
	  	   </div>
	  	</div>
	  	<div className="absolute pt-[103px] md:relative md:w-[60%] flex flex-col w-full bg-white top-0 h-full">
		    <div style={{borderBottom: "1px solid #eee"}} className="flex p-2 h-[3.7rem] items-center border-b border-t border-t-4 border-[#eeeeee]">
		      <p>Loading...</p>
	  		<div>
	  		   <img
				 src="#"			     
				 className="w-8 h-8 rounded-full object-cover"
			     alt="profile"
			   />
	  		</div>
	  		<div className="ml-2">
	  		    <h4>
			        Name
	  		    </h4>
	  		    <p className="text-sm mt-[-3px] text-green-500">
	  		        Online
	  		    </p>
	  		</div>
	  	    </div>
		    <div className="p-3 flex-1 overflow-auto">
				<p>Loading</p>
					<span className="flex justify-end ">
					    <img
					      src="#"
					      alt="profile"
					      className="w-5 h-5 mr-2 rounded-full object-cover"
					    />
					    <span className="py-2 px-3 mb-3 bg-gray-200 rounded-xl rounded-tl-none">
					    	<p>msg</p>
					        <p className="text-gray-500 text-xs">
					    	</p>
					    </span>
					</span>
				    <div className="flex flex-col justify-center items-center">
					<img src="#" className="w-[15rem]" alt="No message" />
					<p className="text-gray-600 mt-6">Messages will appear here</p>
				    </div>
	  	    </div>
		    <form   className="flex p-3 gap-3 bg-[#dde1ff]">
			<button className="py-3 px-3 bg-white rounded-md">
                    	    <ChatBubbleLeftRightIcon className="h-5 w-5" aria-hidden="true" />
			</button>
	     		<input
	  		   className="flex-1 rounded-md p-3"
	  		   type="text"
	  		   placeholder="Type your message here..."
	   		/>
	  		<input
	  		   className="py-3 px-5 rounded-md bg-[#4e5b92] hover:bg-ADashPrimary text-white cursor-pointer"
	  		   type="submit"
	  		/>
	  	    </form>
	  	</div>
	  </div>
      </div>
  );
};

export default Chats;
