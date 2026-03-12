import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import {
  LayoutDashboard,
  Images,
  MessageSquare,
  Plus,
  Trash2,
  Edit,
  Eye,
  EyeOff,
  LogOut,
  X,
  Save,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { toast } from "sonner";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [authHeader, setAuthHeader] = useState("");
  const [activeTab, setActiveTab] = useState("gallery");

  // Gallery state
  const [galleryImages, setGalleryImages] = useState([]);
  const [isAddingImage, setIsAddingImage] = useState(false);
  const [editingImage, setEditingImage] = useState(null);
  const [imageForm, setImageForm] = useState({
    title: "",
    description: "",
    category: "cad",
    image_url: "",
    order: 0,
  });

  // Contacts state
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    const auth = btoa(`${credentials.username}:${credentials.password}`);
    const header = `Basic ${auth}`;

    try {
      // Test authentication by fetching gallery
      await axios.get(`${API}/admin/contacts`, {
        headers: { Authorization: header },
      });
      setAuthHeader(header);
      setIsAuthenticated(true);
      toast.success("Logged in successfully");
    } catch (error) {
      toast.error("Invalid credentials");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAuthHeader("");
    setCredentials({ username: "", password: "" });
    toast.success("Logged out successfully");
  };

  const fetchGallery = async () => {
    try {
      const response = await axios.get(`${API}/gallery`);
      setGalleryImages(response.data);
    } catch (error) {
      console.error("Error fetching gallery:", error);
    }
  };

  const fetchContacts = async () => {
    try {
      const response = await axios.get(`${API}/admin/contacts`, {
        headers: { Authorization: authHeader },
      });
      setContacts(response.data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  const seedGallery = async () => {
    try {
      await axios.post(
        `${API}/admin/seed-gallery`,
        {},
        { headers: { Authorization: authHeader } }
      );
      toast.success("Gallery seeded with default images");
      fetchGallery();
    } catch (error) {
      toast.error("Failed to seed gallery");
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchGallery();
      fetchContacts();
    }
  }, [isAuthenticated]);

  const handleAddImage = async () => {
    try {
      await axios.post(`${API}/admin/gallery`, imageForm, {
        headers: { Authorization: authHeader },
      });
      toast.success("Image added successfully");
      setIsAddingImage(false);
      resetImageForm();
      fetchGallery();
    } catch (error) {
      toast.error("Failed to add image");
    }
  };

  const handleUpdateImage = async () => {
    try {
      await axios.put(`${API}/admin/gallery/${editingImage.id}`, imageForm, {
        headers: { Authorization: authHeader },
      });
      toast.success("Image updated successfully");
      setEditingImage(null);
      resetImageForm();
      fetchGallery();
    } catch (error) {
      toast.error("Failed to update image");
    }
  };

  const handleDeleteImage = async (id) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;
    try {
      await axios.delete(`${API}/admin/gallery/${id}`, {
        headers: { Authorization: authHeader },
      });
      toast.success("Image deleted successfully");
      fetchGallery();
    } catch (error) {
      toast.error("Failed to delete image");
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await axios.put(
        `${API}/admin/contacts/${id}/read`,
        {},
        { headers: { Authorization: authHeader } }
      );
      fetchContacts();
    } catch (error) {
      toast.error("Failed to mark as read");
    }
  };

  const handleDeleteContact = async (id) => {
    toast.info("Contact records are stored in Google Sheets and cannot be deleted from here. Please delete directly from the spreadsheet.");
  };

  const resetImageForm = () => {
    setImageForm({
      title: "",
      description: "",
      category: "cad",
      image_url: "",
      order: 0,
    });
  };

  const openEditModal = (image) => {
    setEditingImage(image);
    setImageForm({
      title: image.title,
      description: image.description || "",
      category: image.category,
      image_url: image.image_url,
      order: image.order || 0,
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-obsidian-500 pt-32 flex items-center justify-center" data-testid="admin-login-page">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md mx-4"
        >
          <div className="bg-obsidian-400/50 border border-white/10 p-8 rounded-lg">
            <h1 className="font-heading text-2xl text-white text-center mb-6">
              Admin Login
            </h1>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label className="text-muted-foreground text-sm">Username</Label>
                <Input
                  type="text"
                  value={credentials.username}
                  onChange={(e) =>
                    setCredentials({ ...credentials, username: e.target.value })
                  }
                  required
                  className="bg-transparent border-white/10 text-white"
                  data-testid="admin-username"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-muted-foreground text-sm">Password</Label>
                <Input
                  type="password"
                  value={credentials.password}
                  onChange={(e) =>
                    setCredentials({ ...credentials, password: e.target.value })
                  }
                  required
                  className="bg-transparent border-white/10 text-white"
                  data-testid="admin-password"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-gold-400 text-black hover:bg-white font-semibold uppercase tracking-widest text-xs py-5 rounded-sm"
                data-testid="admin-login-btn"
              >
                Login
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-obsidian-500 pt-24" data-testid="admin-dashboard">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-heading text-3xl text-white">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your gallery and contacts</p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-white/10 text-white hover:border-red-500 hover:text-red-500"
            data-testid="admin-logout"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-obsidian-400/50 border border-white/10 mb-8" data-testid="admin-tabs">
            <TabsTrigger
              value="gallery"
              className="data-[state=active]:bg-gold-400 data-[state=active]:text-black"
              data-testid="admin-tab-gallery"
            >
              <Images className="w-4 h-4 mr-2" />
              Gallery
            </TabsTrigger>
            <TabsTrigger
              value="contacts"
              className="data-[state=active]:bg-gold-400 data-[state=active]:text-black"
              data-testid="admin-tab-contacts"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Contacts
              {contacts.filter((c) => !c.is_read).length > 0 && (
                <span className="ml-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {contacts.filter((c) => !c.is_read).length}
                </span>
              )}
            </TabsTrigger>
          </TabsList>

          {/* Gallery Tab */}
          <TabsContent value="gallery">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-xl text-white">Gallery Images</h2>
              <div className="flex gap-3">
                <Button
                  onClick={seedGallery}
                  variant="outline"
                  className="border-white/10 text-white hover:border-gold-400 hover:text-gold-400"
                  data-testid="seed-gallery-btn"
                >
                  Seed Default Images
                </Button>
                <Button
                  onClick={() => setIsAddingImage(true)}
                  className="bg-gold-400 text-black hover:bg-white"
                  data-testid="add-image-btn"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Image
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryImages.map((image) => (
                <div
                  key={image.id}
                  className="bg-obsidian-400/50 border border-white/10 rounded-lg overflow-hidden"
                  data-testid={`gallery-item-${image.id}`}
                >
                  <div className="aspect-video relative">
                    <img
                      src={image.image_url}
                      alt={image.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-2 right-2 bg-gold-400 text-black text-xs px-2 py-1 rounded uppercase">
                      {image.category}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-heading text-lg text-white mb-1">
                      {image.title}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                      {image.description || "No description"}
                    </p>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-white/10 text-white hover:border-gold-400 hover:text-gold-400"
                        onClick={() => openEditModal(image)}
                        data-testid={`edit-image-${image.id}`}
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-white/10 text-white hover:border-red-500 hover:text-red-500"
                        onClick={() => handleDeleteImage(image.id)}
                        data-testid={`delete-image-${image.id}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {galleryImages.length === 0 && (
              <div className="text-center py-20">
                <p className="text-muted-foreground mb-4">No images in the gallery yet.</p>
                <Button
                  onClick={seedGallery}
                  className="bg-gold-400 text-black hover:bg-white"
                >
                  Seed Default Images
                </Button>
              </div>
            )}
          </TabsContent>

          {/* Contacts Tab */}
          <TabsContent value="contacts">
            <h2 className="font-heading text-xl text-white mb-6">
              Contact Submissions
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Contact List */}
              <div className="lg:col-span-1 space-y-3">
                {contacts.map((contact) => (
                  <div
                    key={contact.id}
                    className={`bg-obsidian-400/50 border p-4 rounded-lg cursor-pointer transition-colors ${
                      selectedContact?.id === contact.id
                        ? "border-gold-400"
                        : contact.is_read
                        ? "border-white/10"
                        : "border-gold-400/50"
                    }`}
                    onClick={() => {
                      setSelectedContact(contact);
                      if (!contact.is_read) handleMarkAsRead(contact.id);
                    }}
                    data-testid={`contact-item-${contact.id}`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-white font-medium">{contact.name}</h4>
                        <p className="text-muted-foreground text-sm">
                          {contact.email}
                        </p>
                      </div>
                      {!contact.is_read && (
                        <span className="bg-gold-400 text-black text-xs px-2 py-0.5 rounded">
                          New
                        </span>
                      )}
                    </div>
                    <p className="text-muted-foreground text-sm mt-2 line-clamp-2">
                      {contact.message}
                    </p>
                  </div>
                ))}

                {contacts.length === 0 && (
                  <p className="text-muted-foreground text-center py-10">
                    No contact submissions yet.
                  </p>
                )}
              </div>

              {/* Contact Detail */}
              <div className="lg:col-span-2">
                {selectedContact ? (
                  <div className="bg-obsidian-400/50 border border-white/10 p-6 rounded-lg">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h3 className="font-heading text-xl text-white">
                          {selectedContact.name}
                        </h3>
                        <p className="text-muted-foreground">
                          {selectedContact.company || "No company"}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-white/10 text-white hover:border-red-500 hover:text-red-500"
                        onClick={() => handleDeleteContact(selectedContact.id)}
                        data-testid="delete-contact-btn"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </Button>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <p className="text-muted-foreground text-sm">Email</p>
                        <a
                          href={`mailto:${selectedContact.email}`}
                          className="text-gold-400 hover:underline"
                        >
                          {selectedContact.email}
                        </a>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-sm">Phone</p>
                        <p className="text-white">
                          {selectedContact.phone || "Not provided"}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-sm">
                          Interested Package
                        </p>
                        <p className="text-white">
                          {selectedContact.package_interest || "Not specified"}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-sm">Date</p>
                        <p className="text-white">
                          {new Date(selectedContact.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div>
                      <p className="text-muted-foreground text-sm mb-2">Message</p>
                      <p className="text-white leading-relaxed bg-obsidian-500/50 p-4 rounded-lg">
                        {selectedContact.message}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-obsidian-400/50 border border-white/10 p-6 rounded-lg flex items-center justify-center h-64">
                    <p className="text-muted-foreground">
                      Select a contact to view details
                    </p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Add Image Modal */}
      <Dialog open={isAddingImage} onOpenChange={setIsAddingImage}>
        <DialogContent className="bg-obsidian-400 border-white/10 text-white">
          <DialogHeader>
            <DialogTitle className="font-heading text-xl">Add New Image</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-muted-foreground">Title *</Label>
              <Input
                value={imageForm.title}
                onChange={(e) =>
                  setImageForm({ ...imageForm, title: e.target.value })
                }
                className="bg-transparent border-white/10 text-white"
                placeholder="Image title"
                data-testid="image-title-input"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground">Description</Label>
              <Textarea
                value={imageForm.description}
                onChange={(e) =>
                  setImageForm({ ...imageForm, description: e.target.value })
                }
                className="bg-transparent border-white/10 text-white resize-none"
                placeholder="Image description"
                rows={3}
                data-testid="image-desc-input"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground">Category *</Label>
              <Select
                value={imageForm.category}
                onValueChange={(value) =>
                  setImageForm({ ...imageForm, category: value })
                }
              >
                <SelectTrigger className="bg-transparent border-white/10 text-white" data-testid="image-category-select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-obsidian-300 border-white/10">
                  <SelectItem value="cad" className="text-white">
                    CAD Design
                  </SelectItem>
                  <SelectItem value="rendering" className="text-white">
                    Rendering
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground">Image URL *</Label>
              <Input
                value={imageForm.image_url}
                onChange={(e) =>
                  setImageForm({ ...imageForm, image_url: e.target.value })
                }
                className="bg-transparent border-white/10 text-white"
                placeholder="https://..."
                data-testid="image-url-input"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground">Order</Label>
              <Input
                type="number"
                value={imageForm.order}
                onChange={(e) =>
                  setImageForm({ ...imageForm, order: parseInt(e.target.value) || 0 })
                }
                className="bg-transparent border-white/10 text-white"
                data-testid="image-order-input"
              />
            </div>
            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                className="flex-1 border-white/10 text-white"
                onClick={() => {
                  setIsAddingImage(false);
                  resetImageForm();
                }}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-gold-400 text-black hover:bg-white"
                onClick={handleAddImage}
                data-testid="save-image-btn"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Image
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Image Modal */}
      <Dialog open={!!editingImage} onOpenChange={() => setEditingImage(null)}>
        <DialogContent className="bg-obsidian-400 border-white/10 text-white">
          <DialogHeader>
            <DialogTitle className="font-heading text-xl">Edit Image</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-muted-foreground">Title *</Label>
              <Input
                value={imageForm.title}
                onChange={(e) =>
                  setImageForm({ ...imageForm, title: e.target.value })
                }
                className="bg-transparent border-white/10 text-white"
                data-testid="edit-image-title"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground">Description</Label>
              <Textarea
                value={imageForm.description}
                onChange={(e) =>
                  setImageForm({ ...imageForm, description: e.target.value })
                }
                className="bg-transparent border-white/10 text-white resize-none"
                rows={3}
                data-testid="edit-image-desc"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground">Category *</Label>
              <Select
                value={imageForm.category}
                onValueChange={(value) =>
                  setImageForm({ ...imageForm, category: value })
                }
              >
                <SelectTrigger className="bg-transparent border-white/10 text-white" data-testid="edit-image-category">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-obsidian-300 border-white/10">
                  <SelectItem value="cad" className="text-white">
                    CAD Design
                  </SelectItem>
                  <SelectItem value="rendering" className="text-white">
                    Rendering
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground">Image URL *</Label>
              <Input
                value={imageForm.image_url}
                onChange={(e) =>
                  setImageForm({ ...imageForm, image_url: e.target.value })
                }
                className="bg-transparent border-white/10 text-white"
                data-testid="edit-image-url"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground">Order</Label>
              <Input
                type="number"
                value={imageForm.order}
                onChange={(e) =>
                  setImageForm({ ...imageForm, order: parseInt(e.target.value) || 0 })
                }
                className="bg-transparent border-white/10 text-white"
                data-testid="edit-image-order"
              />
            </div>
            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                className="flex-1 border-white/10 text-white"
                onClick={() => {
                  setEditingImage(null);
                  resetImageForm();
                }}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-gold-400 text-black hover:bg-white"
                onClick={handleUpdateImage}
                data-testid="update-image-btn"
              >
                <Save className="w-4 h-4 mr-2" />
                Update Image
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPage;
