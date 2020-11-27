using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
namespace SignalR_Bingo.Hubs
{

    public class BingoHub : Hub
    {
        public Random rnd = new Random(); // Laver en ny random
        public async Task SendNumbers()
        {
            int[] newNumbers = new int[25]; // Array af ints til at populate bingosquares

            int i = 0;
            while (i < 25) // While loop der kører indtil alle 25 bingofelter er populated
            {
                int n = rnd.Next(1, 91); // Genererer et random tal mellem 1 og 90
                if (!newNumbers.Contains(n)) // Checker om tallet allerede eksisterer i arrayet (Sørger for unikke tal)
                {
                    newNumbers[i] = n;
                    i++;
                }
            }
            await Clients.Caller.SendAsync("NewBoard", newNumbers); // SignalR stuff
        }
    }
}
