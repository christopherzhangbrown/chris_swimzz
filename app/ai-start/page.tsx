import { redirect } from "next/navigation"

/** Kept so links published before the section was renamed still land in the
 *  right place. Points at the new anchor, not the old one. */
export default function AiStartPage() {
  redirect("/#swimvolt")
}
