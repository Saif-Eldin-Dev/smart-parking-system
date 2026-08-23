FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["SmartParkingApi/SmartParkingApi.csproj", "SmartParkingApi/"]
RUN dotnet restore "SmartParkingApi/SmartParkingApi.csproj"
COPY . .
WORKDIR /src/SmartParkingApi
RUN dotnet publish -c Release -o /app/out

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/out .
EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080
ENTRYPOINT ["dotnet", "SmartParkingApi.dll"]
