using Infrastracture.Persistence;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UnitTests
{
    internal class ConnectionFactory : IDisposable
    {
        private bool disposedValue = false;

        public AppDbContext CreateContextForInMemory()
        {
            var option = new DbContextOptionsBuilder<AppDbContext>().UseInMemoryDatabase(databaseName: "GiftShop").Options;
            var context = new AppDbContext(option);
            if (context != null)
            {
                context.Database.EnsureDeleted();
                context.Database.EnsureCreated();
            }

            return context;
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing)
                {
                }

                disposedValue = true;
            }
        }

        public void Dispose()
        {
            Dispose(true);
        }
    }
}
