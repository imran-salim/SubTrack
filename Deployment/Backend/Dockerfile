FROM archlinux
WORKDIR /usr/local/subtrack/backend
RUN pacman -Syyu --noconfirm
RUN pacman -S --noconfirm dotnet-sdk aspnet-targeting-pack aspnet-runtime
RUN dotnet tool install dotnet-ef
