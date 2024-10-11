import { H2, PrivateContent } from '../../components';
import { TableRow, UserRow } from './components';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ROLE } from '../../constants';
import { checkAccess, request } from '../../utils';
import { useSelector } from 'react-redux';
import { selectUserRole } from '../../selectors';

const UsersContainer = ({ className }) => {
  const userRole = useSelector(selectUserRole);
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [shouldUpdateUserList, setShouldUpdateUserList] = useState(false);

  useEffect(() => {
    if (!checkAccess([ROLE.ADMIN], userRole)) {
      return;
    }

    Promise.all([request('/api/users'), request('/api/users/roles')]).then(
      ([
        { data: usersData, error: usersError },
        { data: rolesData, error: rolesError },
      ]) => {
        if (usersError || rolesError) {
          setErrorMessage(usersError || rolesError);
          return;
        }

        setUsers(usersData);
        setRoles(rolesData);
      }
    );
  }, [shouldUpdateUserList, userRole]);

  const onUserRemove = (userId) => {
    if (!checkAccess([ROLE.ADMIN], userRole)) {
      return;
    }

    request(`/api/users/${userId}`, 'DELETE').then(() => {
      setShouldUpdateUserList(!shouldUpdateUserList);
    });
  };

  return (
    <div className={className}>
      <PrivateContent access={[ROLE.ADMIN]} serverError={errorMessage}>
        <H2>Пользователи</H2>
        <div>
          <TableRow>
            <div className="login-column">Логин</div>
            <div className="registered-at-column">Дата регистрации</div>
            <div className="role-column">Роль</div>
          </TableRow>
          {users.map(({ id, login, registeredAt, roleId }) => (
            <UserRow
              key={id}
              id={id}
              login={login}
              registeredAt={registeredAt}
              roleId={roleId}
              roles={roles.filter(({ id }) => id !== ROLE.GUEST)}
              onUserRemove={() => onUserRemove(id)}
            />
          ))}
        </div>
      </PrivateContent>
    </div>
  );
};

export const Users = styled(UsersContainer)`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 570px;
  font-size: 18px;
`;
