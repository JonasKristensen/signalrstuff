using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Microsoft.VisualStudio.Web.CodeGeneration.Utils.Messaging;
using SignalR_Bingo.Hubs;

namespace SignalR_Bingo.Hubs
{
    public class CompareHub : Hub
    {
        public static Random rng = new Random();
        public static Queue<int> Numbers;
        public async Task DrawBingoNumber()
        {
        }

        public override async Task OnConnectedAsync()
        {
            Numbers = new Queue<int>();
            int a;

            //Build list of numbers
            for (int i = 0; i < 90; i++)
            {
                a = rng.Next(100);

                while (Numbers.Contains(a))
                {
                    a = rng.Next(100);
                }

                Numbers.Enqueue(a);
            }
            await DrawNumbers();
        }

        public async Task Winner()
        {
            Console.WriteLine("Someone has won!");
        }

        private async Task DrawNumbers()
        {
            while (true)
            {
                int number = Numbers.Dequeue();
                await Clients.All.SendAsync("DrawBingoNumber", number);

                Thread.Sleep(500);
            }
        }
    }
}
