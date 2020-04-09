with recursive cte (userId, name, phone, underUserId) as (
  select     userId,
             name,
             phone,
             underUserId,
             organisationId
  from       User
  left join Role on Role.roleId = User.roleId
  where      userId = {{userId}} AND organisationId = {{organisationId}}
  union all
  select     p.userId,
             p.name,
             p.phone,
             p.underUserId,
             p.organisationId
  from       User p
  where organisationId = cte.organisationId OR p.underUserId = cte.userId
  left join Role on Role.roleId = p.roleId
  inner join cte
          on p.underUserId = cte.userId
)
select * from cte;
