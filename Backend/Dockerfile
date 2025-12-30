FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

COPY ["SubTrack.csproj", "./"]
RUN dotnet restore "SubTrack.csproj"

COPY . .

RUN dotnet publish "SubTrack.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final
WORKDIR /app
EXPOSE 8080

RUN mkdir -p /app/data

COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "SubTrack.dll"]
