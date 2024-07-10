import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

const Search = ({ position='sticky' }) => {

  const handleSearchButtonClick = (e) => {
    e.preventDefault();
  };

  return (
    <form
      style={{ zIndex: "1" }}
      className={`relative mt-4 mb-0 flex h-10 w-full items-center md:h-[51px] md:px-0 lg:mt-0 lg:w-auto lg:flex-1 ${
      	position === 'relative' && "px-6 lg:px-[2%]"
      }`}
      onSubmit={handleSearchButtonClick}
    >

      {position === 'relative' && 
	      <select
		value=""
		className="hidden w-[7.5rem] h-full border border-r-0 p-2 lg:block"
	      >
		<option value="">Everything</option>

	      </select>

      <input
        className={`h-full flex-1 border ${
	    position === 'relative' ? "border-r-0 lg:border-l-0  pl-[20px]" : "pl-4"
	}`}
        type="text"
        value=""
        placeholder="Search products, brands and categories"
        ref={inputRef}
      />
        <ul
          style={{ width: "100%" }}
          className="w-full top-[2.8rem] suggestions-list absolute right-0 left-0 z-10 mt-1 w-64 border bg-white"
        >
            <li
              className="p-2 md:p-4"
            >
            </li>
        </ul>
        <ul
          style={{ width: "100%" }}
          className="w-full top-[2.8rem] suggestions-list absolute right-0 left-0 z-10 mt-1 w-64 border bg-white"
        >
            <li
              key={index}
              className="cursor-pointer p-2 md:p-4 hover:bg-gray-200"
            >
              suggestion
            </li>
          ))}
          <li className="grid grid-cols-2 gap-4 divide-x divide-gray-900/5 bg-gray-50 py-4 px-8 lg:hidden">
            <select
              style={{ fontSize: "14px" }}
              className="flex items-center justify-center gap-x-2.5 p-3 text-gray-900 hover:bg-gray-100"
            >
              <option value={10}>10 km</option>
              <option value={20}>20 km</option>
              <option value={30}>30 km</option>
            </select>

            <select
              value=""
              className="flex items-center justify-center gap-x-2.5 p-3 text-gray-900 hover:bg-gray-100"
            >
              <option value="">Everything</option>
                  <option key={category.id} value={category.id}>
                     category 
                  </option>
            </select>
          </li>
        </ul>
      )}

      {position === 'relative' && 
          <>
	      <button
		className="search__button relative pr-[22px] pl-[22px] hidden h-full text-white md:block"
		type="submit"
	      >
		<span className="relative" style={{zIndex:"1"}}>SEARCH</span>
	      </button>
	      <button
		className="block h-full px-3 text-white md:hidden md:px-[22px]"
		style={{ background: "#ff5959" }}
		type="submit"
	      >
		<MagnifyingGlassIcon className="h-5 w-5" />
	      </button>
	  </>
      }
    </form>
  );
};

export default Search;
