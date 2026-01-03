import { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { Sparkles } from "lucide-react";
import ContactForm from "./ContactForm.jsx";
import ContactList from "./ContactList.jsx";
import { getContacts, createContact, deleteContact } from "./services/api.js";

function App() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSorted, setIsSorted] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async (sortByName = false) => {
    try {
      setLoading(true);
      const data = await getContacts(sortByName);
      if (data && data.success && data.data) {
        setContacts(data.data);
      } else {
        setContacts([]);
      }
    } catch (error) {
      toast.error("Failed to load contacts");
      setContacts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddContact = async (contactData) => {
    try {
      const data = await createContact(contactData);
      setContacts((prev) => [data.data, ...prev]);
      toast.success("Added to directory");
    } catch (error) {
      const message = error.response?.data?.message || "Failed to add contact";
      toast.error(message);
      throw error;
    }
  };

  const handleDeleteContact = async (id) => {
    try {
      const data = await deleteContact(id);
      setContacts((prev) => prev.filter((contact) => contact._id !== id));
      toast.success("Contact removed");
    } catch (error) {
      toast.error("Could not delete contact");
    }
  };

  const handleSort = () => {
    const newSortState = !isSorted;
    setIsSorted(newSortState);
    fetchContacts(newSortState);
  };

  return (
    
    <div className="min-h-screen bg-slate-50 relative selection:bg-violet-200 selection:text-violet-900">
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-violet-200/30 blur-[100px]" />
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] rounded-full bg-indigo-200/30 blur-[100px]" />
        <div className="absolute -bottom-[10%] left-[20%] w-[30%] h-[30%] rounded-full bg-blue-100/30 blur-[100px]" />
      </div>
      <Toaster position="bottom-right" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <header className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="bg-white p-2.5 rounded-xl shadow-sm border border-slate-100">
              <Sparkles className="text-violet-600" size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-black text-slate-800 tracking-tight">
                Nexus
              </h1>
              <p className="text-slate-500 font-medium">Personal CRM</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="h-10 w-10 rounded-full bg-slate-200 border-2 border-white shadow-sm overflow-hidden">
              <img
                src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix"
                alt="User"
              />
            </div>
          </div>
        </header>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-4 lg:sticky lg:top-8">
            <ContactForm onContactAdded={handleAddContact} />
          </div>
          <div className="lg:col-span-8">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[1, 2, 3, 4].map((n) => (
                  <div
                    key={n}
                    className="bg-white rounded-2xl p-5 border border-slate-100 h-48 animate-pulse"
                  >
                    <div className="flex gap-4">
                      <div className="h-12 w-12 bg-slate-200 rounded-full"></div>
                      <div className="flex-1 space-y-2 py-1">
                        <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                        <div className="h-3 bg-slate-200 rounded w-1/4"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <ContactList
                contacts={contacts}
                onDelete={handleDeleteContact}
                onSort={handleSort}
                isSorted={isSorted}
              />
            )}
          </div>
        </div>
      </div>
      <footer className="py-8 text-center">
        <p className="text-slate-400 text-sm font-medium">
          © 2024 Nexus CRM Manager
        </p>
      </footer>
    </div>
  );
}

export default App;
