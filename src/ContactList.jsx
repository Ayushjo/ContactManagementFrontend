import { ArrowUpDown, Users, Search } from "lucide-react";
import ContactItem from "./ContactItem";

const ContactList = ({ contacts, onDelete, onSort, isSorted }) => {
  if (contacts.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-white/50 backdrop-blur-sm border-2 border-dashed border-slate-200 rounded-3xl p-12 text-center min-h-[400px]">
        <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-4">
          <Users size={32} className="text-slate-300" />
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">
          Your list is empty
        </h3>
        <p className="text-slate-500 max-w-xs mx-auto leading-relaxed">
          It looks like you haven't added any contacts yet. Use the form to get
          started.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <div className="flex flex-col sm:flex-row justify-between items-end sm:items-center gap-4 bg-white/60 backdrop-blur-md p-4 rounded-2xl border border-white/20 shadow-sm">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Contacts</h2>
          <p className="text-slate-500 text-sm font-medium">
            Viewing {contacts.length}{" "}
            {contacts.length === 1 ? "entry" : "entries"}
          </p>
        </div>

        <button
          onClick={onSort}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-all border ${
            isSorted
              ? "bg-violet-100 text-violet-700 border-violet-200"
              : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
          }`}
        >
          <ArrowUpDown size={16} />
          <span>{isSorted ? "Newest First" : "Sort A-Z"}</span>
        </button>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {contacts.map((contact) => (
          <ContactItem
            key={contact._id}
            contact={contact}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default ContactList;
