import { IconButton } from "~/components/icon-button";
import { Input } from "~/components/input";
import { IoFilterOutline } from "react-icons/io5";
import { Modal } from "~/components/modal";
import { FilterForm } from "~/pages/home/components/hero/filter-form";
import { useState } from "react";
import { defaultFilter, useFilter } from "~/providers/filter";

export const HeroSearchBar = () => {
  const { setFilter, filter, searchBar, setSearchBar } = useFilter();
  const [open, setOpen] = useState(false);

  return (
    <>
      <Modal title="Filter Events" open={open} onClose={() => setOpen(false)}>
        <FilterForm
          defaultValues={filter}
          onFinish={async (data) => {
            setFilter(data);
          }}
          onReset={async () => {
            setFilter(defaultFilter);
          }}
        />
      </Modal>
      <Input
        suffix={
          <IconButton onClick={() => setOpen((prev) => !prev)} children={<IoFilterOutline />} />
        }
        value={searchBar}
        onChange={(value) => {
          setSearchBar(value.target.value);
        }}
      />
    </>
  );
};
