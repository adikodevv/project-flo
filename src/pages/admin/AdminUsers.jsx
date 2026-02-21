import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useMain } from "../../context/MainContext";
import scss from "./AdminUsers.module.scss";

const USERS_API_URL = "https://69653e01e8ce952ce1f49d37.mockapi.io/user";

const toArray = (data) =>
  Array.isArray(data?.data) ? data.data : Array.isArray(data) ? data : [];

const AdminUsers = () => {
  const { t, language } = useMain();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const locale =
    language === "EN" ? "en-US" : language === "KG" ? "ky-KG" : "ru-RU";

  const formatDate = (value) => {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "-";
    return new Intl.DateTimeFormat(locale, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date);
  };

  const loadUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(USERS_API_URL);
      setUsers(toArray(response.data));
    } catch (error) {
      console.error("Admin users fetch error:", error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return users;

    return users.filter((user) =>
      `${user.name || ""} ${user.email || ""}`.toLowerCase().includes(q),
    );
  }, [users, searchTerm]);

  const usersToday = useMemo(() => {
    const now = new Date();
    return users.filter((user) => {
      const createdAt = new Date(user.createdAt || 0);
      return (
        createdAt.getFullYear() === now.getFullYear() &&
        createdAt.getMonth() === now.getMonth() &&
        createdAt.getDate() === now.getDate()
      );
    }).length;
  }, [users]);

  const handleDeleteUser = async (user) => {
    if (!user?.id) return;
    if (String(user.email || "").toLowerCase() === "admin@gmail.com") {
      alert(t("admin_users_admin_protected"));
      return;
    }

    if (!window.confirm(t("admin_users_confirm_delete"))) return;

    try {
      await axios.delete(`${USERS_API_URL}/${user.id}`);
      setUsers((prev) => prev.filter((item) => item.id !== user.id));
    } catch (error) {
      console.error("Admin users delete error:", error);
      alert(t("admin_users_delete_error"));
    }
  };

  return (
    <section className={scss.usersPage}>
      <header className={scss.header}>
        <div>
          <h1>{t("admin_users_title")}</h1>
          <p>{t("admin_users_subtitle", { count: filteredUsers.length })}</p>
        </div>
        <button type="button" onClick={loadUsers} disabled={loading}>
          {loading ? t("admin_users_loading") : t("admin_users_refresh")}
        </button>
      </header>

      <div className={scss.stats}>
        <article>
          <span>{t("admin_users_total")}</span>
          <strong>{users.length}</strong>
        </article>
        <article>
          <span>{t("admin_users_registered_today")}</span>
          <strong>{usersToday}</strong>
        </article>
      </div>

      <div className={scss.search}>
        <input
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder={t("admin_users_search_placeholder")}
        />
      </div>

      {loading ? (
        <p className={scss.empty}>{t("admin_users_loading")}</p>
      ) : filteredUsers.length === 0 ? (
        <p className={scss.empty}>{t("admin_users_empty")}</p>
      ) : (
        <div className={scss.tableWrap}>
          <table className={scss.table}>
            <thead>
              <tr>
                <th>{t("admin_users_name")}</th>
                <th>{t("contact_email_label")}</th>
                <th>{t("admin_users_registered")}</th>
                <th>{t("admin_users_actions")}</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => {
                const isAdmin =
                  String(user.email || "").toLowerCase() === "admin@gmail.com";

                return (
                  <tr key={user.id}>
                    <td>{user.name || "-"}</td>
                    <td>{user.email || "-"}</td>
                    <td>{formatDate(user.createdAt)}</td>
                    <td>
                      <button
                        type="button"
                        onClick={() => handleDeleteUser(user)}
                        disabled={isAdmin}
                        className={scss.deleteBtn}
                      >
                        {isAdmin ? t("admin_users_admin_role") : t("admin_users_delete")}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default AdminUsers;
