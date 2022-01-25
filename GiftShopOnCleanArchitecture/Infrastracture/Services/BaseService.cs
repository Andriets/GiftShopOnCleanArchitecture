using Domain.Entities;
using Infrastracture.Persistence;
using Microsoft.EntityFrameworkCore;
using System;

namespace Infrastracture.Services
{
    public class BaseService<T> where T : BaseEntity
    {
        protected readonly AppDbContext _context;

        public BaseService(AppDbContext context)
        {
            _context = context;
        }

        protected DbSet<T> Entities { get => _context.Set<T>(); }

        public T Delete(T entity)
        {
            if (entity == null)
            {
                throw new NotImplementedException();
            }

            Entities.Remove(entity);
            return entity;
        }

        public T Insert(T entity)
        {
            if (entity == null)
            {
                throw new NotImplementedException();
            }

            Entities.Add(entity);
            return entity;
        }

        public T Update(T entity)
        {
            if (entity == null)
            {
                throw new NotImplementedException();
            }

            Entities.Update(entity);
            return entity;
        }
    }
}
