// src/pages/Roles.jsx
import './roles.css';
import PageHeader from '../components/PageHeader';
export default function Roles() {
  const roles = [
    {
      title: "Super Admin",
      description:
        "Has full access to all bot functions. Can block/unblock users, manage the database, and oversee system settings.",
    },
    {
      title: "Content Manager",
      description:
        "Updates FAQs and synonyms in Firebase to ensure accurate and relevant responses.",
    },
    {
      title: "Moderator",
      description:
        "Reviews incoming queries, flags inappropriate ones, and monitors blocked keyword usage.",
    },
    {
      title: "Analytics Lead",
      description:
        "Analyzes user logs and unanswered queries, and provides reports for bot improvement.",
    },
    {
      title: "DevOps Engineer",
      description:
        "Manages hosting, server status, environment files, and API keys.",
    },
    {
      title: "GPT Trainer",
      description:
        "Refines prompt templates, tests fallback responses, and improves GPT query understanding.",
    },
  {
    title: "Super Admin",
    description:
      "Has full control over all bot operations including blocking users, managing database access, and updating system settings.",
  },
  {
    title: "Content Manager",
    description:
      "Responsible for maintaining and updating FAQs, synonyms, and valid intents in Firebase to ensure the bot's accuracy.",
  },
  {
    title: "Moderator",
    description:
      "Monitors incoming queries, filters abusive or off-topic content, and manages flagged messages and blocked keywords.",
  },
  {
    title: "Analytics Lead",
    description:
      "Analyzes logs, user behavior, and unanswered queries to provide regular performance reports and improvement suggestions.",
  },
  {
    title: "DevOps Engineer",
    description:
      "Handles server deployment, API integration, environment configuration, and ensures smooth backend operations.",
  },
  {
    title: "GPT Prompt Designer",
    description:
      "Crafts and optimizes prompt instructions to improve GPT fallback responses and classification accuracy.",
  },
  {
    title: "UI/UX Designer",
    description:
      "Designs clean and user-friendly pages for the admin panel, ensuring smooth interaction and visual consistency.",
  },
  {
    title: "Query Auditor",
    description:
      "Manually reviews unanswered or misclassified queries to train the model better and update FAQs accordingly.",
  },
  {
    title: "Database Manager",
    description:
      "Maintains Firebase structure, updates schema as needed, and ensures data integrity for all logs and queries.",
  },
  {
    title: "Training Coordinator",
    description:
      "Onboards new admins, documents system usage, and ensures team members understand their roles clearly.",
  }

  ];

  return (
    <div className="roles-page">
      <PageHeader
  icon="🛡️"
  title="Admin Roles"
  subtitle="Manage access levels and permissions for different admin users."
/>
      <table className="roles-table">
        <thead>
          <tr>
            <th>Role</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role, index) => (
            <tr key={index}>
              <td>{role.title}</td>
              <td>{role.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
