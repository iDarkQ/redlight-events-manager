import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { basename, join } from "path";
import { promises as fs } from "fs";

@Injectable()
export class FileService {
    async moveTempToPermanent(folder: string, fileUrl: string): Promise<string> {
        const fileName = basename(fileUrl);

        const tmpPath = join(process.cwd(), "static", "uploads", "tmp", folder, fileName);
        const permanentDir = join(process.cwd(), "static", "uploads", "permanent", folder);
        const permanentPath = join(permanentDir, fileName);

        try {
            await fs.mkdir(permanentDir, { recursive: true });
            await fs.mkdir(join(process.cwd(), "static", "uploads", "tmp", folder), {
                recursive: true,
            });
        } catch (err) {
            throw new InternalServerErrorException(
                "Could not create upload directories: " + err.message,
            );
        }

        try {
            await fs.access(tmpPath);
        } catch {
            throw new NotFoundException(`File to move not found: ${fileName}`);
        }

        try {
            await fs.rename(tmpPath, permanentPath);
            return join("static", "uploads", "permanent", folder, fileName);
        } catch (err) {
            throw new InternalServerErrorException(
                `Failed to move file from tmp to permanent: ${err.message}`,
            );
        }
    }

    async deletePermanentFile(folder: string, fileName: string): Promise<void> {
        const filePath = join(process.cwd(), "static", "uploads", "permanent", folder, fileName);
        try {
            await fs.unlink(filePath);
        } catch (err) {
            if (err.code === "ENOENT") {
                return;
            }
            throw new InternalServerErrorException(`Failed to delete event banner: ${err.message}`);
        }
    }
}
