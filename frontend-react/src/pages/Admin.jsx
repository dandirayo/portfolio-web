import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import SectionTitle from "../components/SectionTitle";
import { apiEndpoints } from "../config/api";

const adminKeyStorage = "portfolio-admin-key";

const tabs = [
  { id: "profile", label: "Profile" },
  { id: "projects", label: "Projects" },
  { id: "expertise", label: "Expertise" },
  { id: "skills", label: "Skills" },
  { id: "timeline", label: "Timeline" },
  { id: "messages", label: "Messages" },
];

const emptyDashboard = {
  profile: null,
  expertise: [],
  projects: [],
  skillGroups: [],
  timeline: [],
  contactMessages: [],
};

const expertiseFields = [
  { name: "sortOrder", label: "Order", type: "number" },
  { name: "title", label: "Title" },
  { name: "eyebrow", label: "Eyebrow" },
  { name: "description", label: "Description", type: "textarea", rows: 4 },
  { name: "tools", label: "Tools", type: "list", rows: 5 },
];

const skillFields = [
  { name: "sortOrder", label: "Order", type: "number" },
  { name: "score", label: "Legacy Score", type: "number" },
  { name: "title", label: "Title" },
  { name: "level", label: "Level" },
  { name: "usage", label: "Usage", type: "textarea", rows: 4 },
  { name: "tools", label: "Tools" },
];

const timelineFields = [
  { name: "sortOrder", label: "Order", type: "number" },
  { name: "period", label: "Period" },
  { name: "title", label: "Title" },
  { name: "org", label: "Organization" },
  { name: "description", label: "Description", type: "textarea", rows: 4 },
];

const sortItems = (left, right) => {
  const leftOrder = left.displayOrder ?? left.sortOrder ?? 0;
  const rightOrder = right.displayOrder ?? right.sortOrder ?? 0;

  return leftOrder - rightOrder || left.id - right.id;
};

const listToText = (items = []) => items.join("\n");

const textToList = (value = "") =>
  value
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);

const toNumber = (value, fallback = 0) => {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
};

const makeJsonText = (value) => JSON.stringify(value ?? [], null, 2);

const parseJsonArray = (value, label) => {
  const parsed = JSON.parse(value || "[]");

  if (!Array.isArray(parsed)) {
    throw new Error(`${label} must be a JSON array.`);
  }

  return parsed;
};

const makeNewProject = (nextOrder) => ({
  projectId: `draft-project-${Date.now()}`,
  slug: `draft-project-${Date.now()}`,
  sortOrder: nextOrder,
  displayOrder: nextOrder,
  title: "Untitled Project",
  summary: "Draft project summary.",
  category: "UI/UX Design",
  year: "Draft",
  type: "Case Study",
  visualLabel: "Project visual",
  image: "/media/placeholders/project-uiux.webp",
  video: "",
  gallery: [
    {
      type: "image",
      url: "/media/placeholders/project-uiux.webp",
      alt: "Temporary project visual",
      caption: "Temporary visual placeholder.",
    },
  ],
  context: "",
  problem: "",
  solution: "",
  role: "Contributor",
  responsibilities: [],
  tools: [],
  results: [],
  lessonsLearned: [],
  githubUrl: "",
  liveDemoUrl: "",
  links: [],
  featured: false,
});

const makeProjectDraft = (project) => ({
  ...project,
  responsibilitiesText: listToText(project?.responsibilities),
  toolsText: listToText(project?.tools),
  resultsText: listToText(project?.results),
  lessonsLearnedText: listToText(project?.lessonsLearned),
  galleryText: makeJsonText(project?.gallery),
  linksText: makeJsonText(project?.links),
});

const buildProjectPayload = (draft) => ({
  id: draft.id,
  projectId: draft.projectId,
  slug: draft.slug,
  sortOrder: toNumber(draft.sortOrder),
  displayOrder: toNumber(draft.displayOrder),
  title: draft.title,
  summary: draft.summary,
  category: draft.category,
  year: draft.year,
  type: draft.type,
  visualLabel: draft.visualLabel,
  image: draft.image,
  video: draft.video,
  gallery: parseJsonArray(draft.galleryText, "Gallery"),
  context: draft.context,
  problem: draft.problem,
  solution: draft.solution,
  role: draft.role,
  responsibilities: textToList(draft.responsibilitiesText),
  tools: textToList(draft.toolsText),
  results: textToList(draft.resultsText),
  lessonsLearned: textToList(draft.lessonsLearnedText),
  githubUrl: draft.githubUrl,
  liveDemoUrl: draft.liveDemoUrl,
  links: parseJsonArray(draft.linksText, "Links"),
  featured: Boolean(draft.featured),
});

function AdminField({
  label,
  name,
  value,
  onChange,
  type = "text",
  rows = 3,
  required = false,
}) {
  return (
    <label className="admin-field">
      <span>{label}</span>
      {type === "textarea" || type === "list" ? (
        <textarea
          name={name}
          value={value ?? ""}
          onChange={onChange}
          rows={rows}
          required={required}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value ?? ""}
          onChange={onChange}
          required={required}
        />
      )}
    </label>
  );
}

function ProfileEditor({ profile, onSave }) {
  const [draft, setDraft] = useState(profile ?? {});

  useEffect(() => {
    setDraft(profile ?? {});
  }, [profile]);

  const updateDraft = (event) => {
    setDraft((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(draft);
  };

  if (!profile) {
    return <div className="admin-empty">Profile data is not available.</div>;
  }

  return (
    <form className="admin-editor" onSubmit={handleSubmit}>
      <div className="admin-form-grid">
        <AdminField label="Name" name="name" value={draft.name} onChange={updateDraft} required />
        <AdminField label="Title" name="title" value={draft.title} onChange={updateDraft} required />
        <AdminField label="Headline" name="headline" value={draft.headline} onChange={updateDraft} required />
        <AdminField label="Location" name="location" value={draft.location} onChange={updateDraft} />
        <AdminField label="Email" name="email" value={draft.email} onChange={updateDraft} type="email" />
        <AdminField label="Phone" name="phone" value={draft.phone} onChange={updateDraft} />
        <AdminField label="LinkedIn URL" name="linkedin" value={draft.linkedin} onChange={updateDraft} />
        <AdminField label="GitHub URL" name="github" value={draft.github} onChange={updateDraft} />
        <AdminField label="Portfolio Label" name="portfolioNode" value={draft.portfolioNode} onChange={updateDraft} />
        <AdminField label="CV URL" name="cvUrl" value={draft.cvUrl} onChange={updateDraft} />
        <AdminField label="Profile Image URL" name="image" value={draft.image} onChange={updateDraft} />
      </div>
      <AdminField
        label="Subheadline"
        name="subheadline"
        value={draft.subheadline}
        onChange={updateDraft}
        type="textarea"
        rows={4}
        required
      />
      <div className="admin-actions">
        <button type="submit" className="btn btn-dark rounded-pill px-4">
          Save Profile
        </button>
      </div>
    </form>
  );
}

function CollectionEditor({
  title,
  items,
  endpoint,
  fields,
  requestConfig,
  createItem,
  onCreated,
  onUpdated,
  onDeleted,
  setStatus,
}) {
  const [selectedId, setSelectedId] = useState(items[0]?.id ?? null);
  const selectedItem = items.find((item) => item.id === selectedId) ?? items[0] ?? null;
  const [draft, setDraft] = useState({});

  useEffect(() => {
    if (!items.some((item) => item.id === selectedId)) {
      setSelectedId(items[0]?.id ?? null);
    }
  }, [items, selectedId]);

  useEffect(() => {
    if (!selectedItem) {
      setDraft({});
      return;
    }

    setDraft(
      fields.reduce(
        (result, field) => ({
          ...result,
          [field.name]:
            field.type === "list"
              ? listToText(selectedItem[field.name])
              : selectedItem[field.name] ?? "",
        }),
        { id: selectedItem.id }
      )
    );
  }, [fields, selectedItem]);

  const updateDraft = (event) => {
    setDraft((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const buildPayload = () =>
    fields.reduce(
      (result, field) => ({
        ...result,
        [field.name]:
          field.type === "list"
            ? textToList(draft[field.name])
            : field.type === "number"
              ? toNumber(draft[field.name])
              : draft[field.name],
      }),
      { id: draft.id }
    );

  const handleCreate = async () => {
    try {
      setStatus({ type: "loading", message: `Creating ${title.toLowerCase()} item...` });
      const response = await axios.post(endpoint, createItem(), requestConfig);
      onCreated(response.data);
      setSelectedId(response.data.id);
      setStatus({ type: "success", message: `${title} item created.` });
    } catch (error) {
      setStatus({ type: "error", message: error.response?.data?.message || `Failed to create ${title.toLowerCase()} item.` });
    }
  };

  const handleSave = async (event) => {
    event.preventDefault();

    if (!draft.id) return;

    try {
      setStatus({ type: "loading", message: `Saving ${title.toLowerCase()} item...` });
      const response = await axios.put(`${endpoint}/${draft.id}`, buildPayload(), requestConfig);
      onUpdated(response.data);
      setStatus({ type: "success", message: `${title} item saved.` });
    } catch (error) {
      setStatus({ type: "error", message: error.response?.data?.message || `Failed to save ${title.toLowerCase()} item.` });
    }
  };

  const handleDelete = async () => {
    if (!selectedItem || !window.confirm(`Delete "${selectedItem.title || selectedItem.period}"?`)) {
      return;
    }

    try {
      setStatus({ type: "loading", message: `Deleting ${title.toLowerCase()} item...` });
      await axios.delete(`${endpoint}/${selectedItem.id}`, requestConfig);
      onDeleted(selectedItem.id);
      setStatus({ type: "success", message: `${title} item deleted.` });
    } catch (error) {
      setStatus({ type: "error", message: error.response?.data?.message || `Failed to delete ${title.toLowerCase()} item.` });
    }
  };

  return (
    <div className="admin-workspace">
      <aside className="admin-list" aria-label={`${title} items`}>
        <div className="admin-list-header">
          <h2>{title}</h2>
          <button type="button" className="btn btn-sm btn-dark rounded-pill" onClick={handleCreate}>
            New
          </button>
        </div>
        {items.length > 0 ? (
          items.map((item) => (
            <button
              key={item.id}
              type="button"
              className={item.id === selectedItem?.id ? "active" : ""}
              onClick={() => setSelectedId(item.id)}
            >
              <strong>{item.title || item.period}</strong>
              <span>{item.eyebrow || item.level || item.org || `Order ${item.sortOrder}`}</span>
            </button>
          ))
        ) : (
          <p>No items yet.</p>
        )}
      </aside>

      {selectedItem ? (
        <form className="admin-editor" onSubmit={handleSave}>
          <div className="admin-form-grid">
            {fields.map((field) => (
              <AdminField
                key={field.name}
                label={field.label}
                name={field.name}
                type={field.type === "list" ? "list" : field.type}
                rows={field.rows}
                value={draft[field.name]}
                onChange={updateDraft}
              />
            ))}
          </div>
          <div className="admin-actions">
            <button type="submit" className="btn btn-dark rounded-pill px-4">
              Save
            </button>
            <button type="button" className="btn btn-outline-danger rounded-pill px-4" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </form>
      ) : (
        <div className="admin-empty">Create an item to start editing.</div>
      )}
    </div>
  );
}

function ProjectEditor({ projects, requestConfig, onCreated, onUpdated, onDeleted, setStatus }) {
  const [selectedId, setSelectedId] = useState(projects[0]?.id ?? null);
  const selectedProject = projects.find((project) => project.id === selectedId) ?? projects[0] ?? null;
  const [draft, setDraft] = useState(null);

  useEffect(() => {
    if (!projects.some((project) => project.id === selectedId)) {
      setSelectedId(projects[0]?.id ?? null);
    }
  }, [projects, selectedId]);

  useEffect(() => {
    setDraft(selectedProject ? makeProjectDraft(selectedProject) : null);
  }, [selectedProject]);

  const updateDraft = (event) => {
    const { checked, name, type, value } = event.target;

    setDraft((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCreate = async () => {
    const nextOrder = projects.length + 1;

    try {
      setStatus({ type: "loading", message: "Creating project..." });
      const response = await axios.post(apiEndpoints.admin.projects, makeNewProject(nextOrder), requestConfig);
      onCreated(response.data);
      setSelectedId(response.data.id);
      setStatus({ type: "success", message: "Project created." });
    } catch (error) {
      setStatus({ type: "error", message: error.response?.data?.message || "Failed to create project." });
    }
  };

  const handleSave = async (event) => {
    event.preventDefault();

    if (!draft) return;

    try {
      setStatus({ type: "loading", message: "Saving project..." });
      const payload = buildProjectPayload(draft);
      const response = await axios.put(`${apiEndpoints.admin.projects}/${draft.id}`, payload, requestConfig);
      onUpdated(response.data);
      setStatus({ type: "success", message: "Project saved." });
    } catch (error) {
      setStatus({ type: "error", message: error.response?.data?.message || error.message || "Failed to save project." });
    }
  };

  const handleDelete = async () => {
    if (!selectedProject || !window.confirm(`Delete "${selectedProject.title}"?`)) {
      return;
    }

    try {
      setStatus({ type: "loading", message: "Deleting project..." });
      await axios.delete(`${apiEndpoints.admin.projects}/${selectedProject.id}`, requestConfig);
      onDeleted(selectedProject.id);
      setStatus({ type: "success", message: "Project deleted." });
    } catch (error) {
      setStatus({ type: "error", message: error.response?.data?.message || "Failed to delete project." });
    }
  };

  return (
    <div className="admin-workspace admin-project-workspace">
      <aside className="admin-list" aria-label="Projects">
        <div className="admin-list-header">
          <h2>Projects</h2>
          <button type="button" className="btn btn-sm btn-dark rounded-pill" onClick={handleCreate}>
            New
          </button>
        </div>
        {projects.map((project) => (
          <button
            key={project.id}
            type="button"
            className={project.id === selectedProject?.id ? "active" : ""}
            onClick={() => setSelectedId(project.id)}
          >
            <strong>{project.title}</strong>
            <span>{project.category} / {project.year}</span>
          </button>
        ))}
      </aside>

      {draft ? (
        <form className="admin-editor" onSubmit={handleSave}>
          <div className="admin-check-row">
            <label>
              <input type="checkbox" name="featured" checked={Boolean(draft.featured)} onChange={updateDraft} />
              Featured on Home
            </label>
            <a href={`/portfolio/${draft.slug}`} target="_blank" rel="noreferrer">
              Preview Detail
            </a>
          </div>

          <div className="admin-form-grid">
            <AdminField label="Project ID" name="projectId" value={draft.projectId} onChange={updateDraft} />
            <AdminField label="Slug" name="slug" value={draft.slug} onChange={updateDraft} />
            <AdminField label="Display Order" name="displayOrder" type="number" value={draft.displayOrder} onChange={updateDraft} />
            <AdminField label="Sort Order" name="sortOrder" type="number" value={draft.sortOrder} onChange={updateDraft} />
            <AdminField label="Title" name="title" value={draft.title} onChange={updateDraft} required />
            <AdminField label="Category" name="category" value={draft.category} onChange={updateDraft} />
            <AdminField label="Year" name="year" value={draft.year} onChange={updateDraft} />
            <AdminField label="Type" name="type" value={draft.type} onChange={updateDraft} />
            <AdminField label="Visual Label" name="visualLabel" value={draft.visualLabel} onChange={updateDraft} />
            <AdminField label="Image URL" name="image" value={draft.image} onChange={updateDraft} />
            <AdminField label="Video URL" name="video" value={draft.video} onChange={updateDraft} />
            <AdminField label="GitHub URL" name="githubUrl" value={draft.githubUrl} onChange={updateDraft} />
            <AdminField label="Live Demo URL" name="liveDemoUrl" value={draft.liveDemoUrl} onChange={updateDraft} />
          </div>

          <AdminField label="Summary" name="summary" value={draft.summary} onChange={updateDraft} type="textarea" rows={3} />
          <AdminField label="Context" name="context" value={draft.context} onChange={updateDraft} type="textarea" rows={4} />
          <AdminField label="Problem" name="problem" value={draft.problem} onChange={updateDraft} type="textarea" rows={4} />
          <AdminField label="Solution" name="solution" value={draft.solution} onChange={updateDraft} type="textarea" rows={4} />
          <AdminField label="Role" name="role" value={draft.role} onChange={updateDraft} />

          <div className="admin-form-grid">
            <AdminField label="Responsibilities" name="responsibilitiesText" value={draft.responsibilitiesText} onChange={updateDraft} type="list" rows={6} />
            <AdminField label="Tools" name="toolsText" value={draft.toolsText} onChange={updateDraft} type="list" rows={6} />
            <AdminField label="Results" name="resultsText" value={draft.resultsText} onChange={updateDraft} type="list" rows={6} />
            <AdminField label="Lessons Learned" name="lessonsLearnedText" value={draft.lessonsLearnedText} onChange={updateDraft} type="list" rows={6} />
            <AdminField label="Gallery JSON" name="galleryText" value={draft.galleryText} onChange={updateDraft} type="textarea" rows={8} />
            <AdminField label="Links JSON" name="linksText" value={draft.linksText} onChange={updateDraft} type="textarea" rows={8} />
          </div>

          <div className="admin-actions">
            <button type="submit" className="btn btn-dark rounded-pill px-4">
              Save Project
            </button>
            <button type="button" className="btn btn-outline-danger rounded-pill px-4" onClick={handleDelete}>
              Delete Project
            </button>
          </div>
        </form>
      ) : (
        <div className="admin-empty">Create a project to start editing.</div>
      )}
    </div>
  );
}

function MessageInbox({ messages, requestConfig, onDeleted, setStatus }) {
  const handleDelete = async (message) => {
    if (!window.confirm(`Delete message from ${message.name}?`)) {
      return;
    }

    try {
      setStatus({ type: "loading", message: "Deleting message..." });
      await axios.delete(`${apiEndpoints.admin.contacts}/${message.id}`, requestConfig);
      onDeleted(message.id);
      setStatus({ type: "success", message: "Message deleted." });
    } catch (error) {
      setStatus({ type: "error", message: error.response?.data?.message || "Failed to delete message." });
    }
  };

  return (
    <div className="admin-message-list">
      {messages.length > 0 ? (
        messages.map((message) => (
          <article className="admin-message" key={message.id}>
            <div>
              <span>{new Date(message.createdAtUtc).toLocaleString()}</span>
              <h2>{message.topic}</h2>
              <p className="admin-message-meta">
                {message.name} / <a href={`mailto:${message.email}`}>{message.email}</a> / {message.emailDeliveryStatus}
              </p>
              <p>{message.message}</p>
            </div>
            <button type="button" className="btn btn-outline-danger btn-sm rounded-pill" onClick={() => handleDelete(message)}>
              Delete
            </button>
          </article>
        ))
      ) : (
        <div className="admin-empty">No contact messages yet.</div>
      )}
    </div>
  );
}

function Admin() {
  const [activeTab, setActiveTab] = useState("profile");
  const [adminKey, setAdminKey] = useState(() => localStorage.getItem(adminKeyStorage) || "");
  const [dashboard, setDashboard] = useState(emptyDashboard);
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState({ type: "idle", message: "" });

  const requestConfig = useMemo(
    () => ({
      headers: adminKey ? { "X-Admin-Key": adminKey } : {},
    }),
    [adminKey]
  );

  const loadDashboard = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(apiEndpoints.admin.snapshot, requestConfig);
      setDashboard(response.data);
      setStatus({ type: "success", message: "Admin data loaded." });
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error.response?.data?.message ||
          "Admin API is unavailable. Start the backend and MySQL, then reload.",
      });
    } finally {
      setIsLoading(false);
    }
  }, [requestConfig]);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  const handleKeyChange = (event) => {
    const value = event.target.value;
    setAdminKey(value);

    if (value) {
      localStorage.setItem(adminKeyStorage, value);
    } else {
      localStorage.removeItem(adminKeyStorage);
    }
  };

  const replaceCollectionItem = (collection, item) => {
    setDashboard((current) => ({
      ...current,
      [collection]: current[collection]
        .map((existing) => (existing.id === item.id ? item : existing))
        .sort(sortItems),
    }));
  };

  const addCollectionItem = (collection, item) => {
    setDashboard((current) => ({
      ...current,
      [collection]: [...current[collection], item].sort(sortItems),
    }));
  };

  const removeCollectionItem = (collection, id) => {
    setDashboard((current) => ({
      ...current,
      [collection]: current[collection].filter((item) => item.id !== id),
    }));
  };

  const saveProfile = async (payload) => {
    try {
      setStatus({ type: "loading", message: "Saving profile..." });
      const response = await axios.put(apiEndpoints.admin.profile, payload, requestConfig);
      setDashboard((current) => ({ ...current, profile: response.data }));
      setStatus({ type: "success", message: "Profile saved." });
    } catch (error) {
      setStatus({ type: "error", message: error.response?.data?.message || "Failed to save profile." });
    }
  };

  const createExpertise = () => ({
    sortOrder: dashboard.expertise.length + 1,
    title: "New Expertise",
    eyebrow: "Focus",
    description: "Describe this expertise area.",
    tools: [],
  });

  const createSkill = () => ({
    sortOrder: dashboard.skillGroups.length + 1,
    title: "New Skill",
    score: 0,
    level: "Experience",
    usage: "Describe how this skill is used.",
    tools: "Tools",
  });

  const createTimeline = () => ({
    sortOrder: dashboard.timeline.length + 1,
    period: "Period",
    title: "New Role",
    org: "Organization",
    description: "Describe this experience.",
  });

  return (
    <main className="page-shell admin-shell">
      <section className="section-padding">
        <div className="container-fluid px-4 px-lg-5">
          <div className="admin-header">
            <SectionTitle
              align="left"
              eyebrow="Local CMS"
              title="Portfolio Admin"
              description="Edit database content locally before preparing the website for online deployment."
            />
            <div className="admin-key-box">
              <label>
                <span>Admin API Key</span>
                <input
                  type="password"
                  value={adminKey}
                  onChange={handleKeyChange}
                  placeholder="Optional for localhost"
                />
              </label>
              <button type="button" className="btn btn-outline-dark rounded-pill px-3" onClick={loadDashboard}>
                Reload
              </button>
            </div>
          </div>

          {status.message && (
            <div className={`admin-status ${status.type}`} role="status" aria-live="polite">
              {status.message}
            </div>
          )}

          <div className="admin-tabs" role="tablist" aria-label="Admin sections">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                className={activeTab === tab.id ? "active" : ""}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {isLoading ? (
            <div className="admin-empty">Loading admin data...</div>
          ) : (
            <>
              {activeTab === "profile" && <ProfileEditor profile={dashboard.profile} onSave={saveProfile} />}
              {activeTab === "projects" && (
                <ProjectEditor
                  projects={dashboard.projects}
                  requestConfig={requestConfig}
                  onCreated={(item) => addCollectionItem("projects", item)}
                  onUpdated={(item) => replaceCollectionItem("projects", item)}
                  onDeleted={(id) => removeCollectionItem("projects", id)}
                  setStatus={setStatus}
                />
              )}
              {activeTab === "expertise" && (
                <CollectionEditor
                  title="Expertise"
                  items={dashboard.expertise}
                  endpoint={apiEndpoints.admin.expertise}
                  fields={expertiseFields}
                  requestConfig={requestConfig}
                  createItem={createExpertise}
                  onCreated={(item) => addCollectionItem("expertise", item)}
                  onUpdated={(item) => replaceCollectionItem("expertise", item)}
                  onDeleted={(id) => removeCollectionItem("expertise", id)}
                  setStatus={setStatus}
                />
              )}
              {activeTab === "skills" && (
                <CollectionEditor
                  title="Skills"
                  items={dashboard.skillGroups}
                  endpoint={apiEndpoints.admin.skills}
                  fields={skillFields}
                  requestConfig={requestConfig}
                  createItem={createSkill}
                  onCreated={(item) => addCollectionItem("skillGroups", item)}
                  onUpdated={(item) => replaceCollectionItem("skillGroups", item)}
                  onDeleted={(id) => removeCollectionItem("skillGroups", id)}
                  setStatus={setStatus}
                />
              )}
              {activeTab === "timeline" && (
                <CollectionEditor
                  title="Timeline"
                  items={dashboard.timeline}
                  endpoint={apiEndpoints.admin.timeline}
                  fields={timelineFields}
                  requestConfig={requestConfig}
                  createItem={createTimeline}
                  onCreated={(item) => addCollectionItem("timeline", item)}
                  onUpdated={(item) => replaceCollectionItem("timeline", item)}
                  onDeleted={(id) => removeCollectionItem("timeline", id)}
                  setStatus={setStatus}
                />
              )}
              {activeTab === "messages" && (
                <MessageInbox
                  messages={dashboard.contactMessages}
                  requestConfig={requestConfig}
                  onDeleted={(id) => removeCollectionItem("contactMessages", id)}
                  setStatus={setStatus}
                />
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
}

export default Admin;
