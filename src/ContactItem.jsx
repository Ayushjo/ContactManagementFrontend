import { Trash2, Mail, Phone, MessageSquare } from "lucide-react";
import toast from "react-hot-toast";

const ContactItem = ({ contact, onDelete }) => {
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleDelete = () => {
    toast(
      (t) => (
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <p className="font-semibold text-gray-900">Delete Contact?</p>
            <p className="text-sm text-gray-500">
              Permanently remove {contact.name}.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                toast.dismiss(t.id);
                onDelete(contact._id);
              }}
              className="px-3 py-1.5 text-sm font-medium bg-red-500 text-white rounded-lg hover:bg-red-600 shadow-sm transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      ),
      {
        duration: 5000,
        style: {
          minWidth: "350px",
          background: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(10px)",
          borderRadius: "16px",
          boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)",
          border: "1px solid rgba(255,255,255,0.5)",
        },
      }
    );
  };

  return (
    <div className="group relative bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-xl hover:border-violet-100 hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4 mb-4">

          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-violet-200">
            {getInitials(contact.name)}
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-lg leading-tight">
              {contact.name}
            </h3>
            <span className="text-xs font-medium text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full border border-slate-100 mt-1 inline-block">
              Added{" "}
              {new Date(contact.createdAt).toLocaleDateString("en-IN", {
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
        </div>

        <button
          onClick={handleDelete}
          className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all opacity-0 group-hover:opacity-100"
          title="Delete contact"
        >
          <Trash2 size={18} />
        </button>
      </div>

      <div className="space-y-3 mt-2">
        <div className="flex items-center gap-3 p-2 rounded-lg bg-slate-50/50 group-hover:bg-violet-50/30 transition-colors">
          <div className="p-1.5 bg-white rounded-md shadow-sm text-violet-500">
            <Mail size={14} />
          </div>
          <span className="text-sm text-slate-600 truncate font-medium">
            {contact.email}
          </span>
        </div>

        <div className="flex items-center gap-3 p-2 rounded-lg bg-slate-50/50 group-hover:bg-violet-50/30 transition-colors">
          <div className="p-1.5 bg-white rounded-md shadow-sm text-indigo-500">
            <Phone size={14} />
          </div>
          <span className="text-sm text-slate-600 font-medium">
            {contact.phone}
          </span>
        </div>

        {contact.message && (
          <div className="flex items-start gap-3 p-2 mt-2">
            <MessageSquare
              size={14}
              className="text-slate-400 mt-1 flex-shrink-0"
            />
            <p className="text-sm text-slate-500 italic line-clamp-2 leading-relaxed">
              "{contact.message}"
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactItem;
