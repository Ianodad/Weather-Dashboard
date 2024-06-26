import React, { useState } from "react";
import useSkySiteStore from "@store";
import { useForm } from "react-hook-form";
// import "./SearchBar.css";
import { FormattedMessage } from "react-intl";

export const SearchFieldBar = () => {
  const { register, handleSubmit, errors } = useForm();
  const [query, setQuery] = useState("");
  const [searchQuery, setSearchQuery] = useSkySiteStore((state) => [
    state.searchQuery,
    state.setSearchQuery,
  ]);

  const onSubmit = async (data) => {
    setSearchQuery(data.searchQuery);
    setQuery("");
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex">
      <FormattedMessage id="Dashboard.search">
        {(search) => (
          <input
            value={query}
            {...register("searchQuery", { required: true, minLength: 3 })}
            onChange={(e) => setQuery(e.target.value)}
            className="mx-4 w-full border rounded-md px-4 py-2 text-black"
            type="text"
            placeholder={search}
          />
        )}
      </FormattedMessage>
      {errors?.query && (
        <p className="text-xs text-red-500">
          Please enter at least 3 characters
        </p>
      )}
      <button
        type="submit"
        className="bg-blue-950 hover:bg-blue-900 text-white dark:bg-white dark:text-blue-950 font-bold py-2 px-4 rounded-full"
      >
        <FormattedMessage id="Dashboard.search" />
      </button>
    </form>
  );
};
